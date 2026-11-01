// Contact form handler: AWS Lambda (Function URL / API Gateway HTTP API, payload v2).
// Also run locally by local-server.ts. Configuration comes only from environment variables.
//
// Flow: CORS → size check → JSON parse → honeypot / timing check → zod validation
//       → per-IP rate limit → deliver (SES, SMTP or console).
import { createHash } from "node:crypto";
import * as z from "zod/mini";
import { MIN_FILL_MS, contactSchema, fieldErrors, type ContactData } from "../../lib/contact-schema";

export type HttpEvent = {
  requestContext?: { http?: { method?: string; sourceIp?: string } };
  headers?: Record<string, string | undefined>;
  body?: string | null;
  isBase64Encoded?: boolean;
};
export type HttpResult = { statusCode: number; headers: Record<string, string>; body: string };

const env = (k: string, d = "") => process.env[k] ?? d;
const MAX_BODY_BYTES = 20_000;

// ─── Rate limiting ────────────────────────────────────────────────
// Fixed window per hashed IP. DynamoDB in production (RATE_LIMIT_TABLE), in-memory locally.
const memoryHits = new Map<string, { count: number; expires: number }>();

async function hit(key: string, windowSec: number): Promise<number> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (now % windowSec);
  const id = `${key}#${windowStart}`;
  const table = env("RATE_LIMIT_TABLE");

  if (!table) {
    for (const [k, v] of memoryHits) if (v.expires <= now) memoryHits.delete(k);
    const entry = memoryHits.get(id) ?? { count: 0, expires: windowStart + windowSec };
    entry.count++;
    memoryHits.set(id, entry);
    return entry.count;
  }

  const { DynamoDBClient, UpdateItemCommand } = await import("@aws-sdk/client-dynamodb");
  const client = new DynamoDBClient({});
  const res = await client.send(
    new UpdateItemCommand({
      TableName: table,
      Key: { pk: { S: id } },
      UpdateExpression: "ADD hits :one SET expiresAt = if_not_exists(expiresAt, :exp)",
      ExpressionAttributeValues: { ":one": { N: "1" }, ":exp": { N: String(windowStart + windowSec) } },
      ReturnValues: "UPDATED_NEW",
    }),
  );
  return Number(res.Attributes?.hits?.N ?? "1");
}

// ─── Delivery ────────────────────────────────────────────────────
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 150);

function formatEmail(d: ContactData) {
  const subject = oneLine(`New enquiry: ${d.service} from ${d.name}${d.company ? ` (${d.company})` : ""}`);
  const text = [
    `Name:    ${d.name}`,
    `Email:   ${d.email}`,
    `Phone:   ${d.phone || "-"}`,
    `Company: ${d.company || "-"}`,
    `Service: ${d.service}`,
    `Budget:  ${d.budget || "-"}`,
    "",
    "Message:",
    d.message,
    "",
    "Sent from the contact form on cloudnesttechnologysolutions.in",
  ].join("\n");
  return { subject, text };
}

async function deliver(d: ContactData) {
  const { subject, text } = formatEmail(d);
  const provider = env("CONTACT_PROVIDER", "console");

  if (provider === "console") {
    console.log(`\n── Contact form (console provider, nothing sent) ──\nSubject: ${subject}\n${text}\n`);
    return;
  }
  if (provider === "ses") {
    const { SESv2Client, SendEmailCommand } = await import("@aws-sdk/client-sesv2");
    const client = new SESv2Client({ region: env("AWS_REGION", "ap-south-1") });
    await client.send(
      new SendEmailCommand({
        FromEmailAddress: env("CONTACT_FROM_EMAIL"),
        Destination: { ToAddresses: env("CONTACT_TO_EMAIL").split(",").map((s) => s.trim()) },
        ReplyToAddresses: [d.email],
        Content: { Simple: { Subject: { Data: subject }, Body: { Text: { Data: text } } } },
      }),
    );
    return;
  }
  if (provider === "smtp") {
    // Any SMTP server. For Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=465, SMTP_USER=<gmail>,
    // SMTP_PASS=<16-char App Password>. Gmail only sends as SMTP_USER, so From defaults to it.
    const { createTransport } = await import("nodemailer");
    const port = Number(env("SMTP_PORT", "465"));
    const transport = createTransport({
      host: env("SMTP_HOST", "smtp.gmail.com"),
      port,
      secure: port === 465,
      auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
    });
    await transport.sendMail({
      from: `"Cloudnest website" <${env("SMTP_FROM", env("SMTP_USER"))}>`,
      to: env("CONTACT_TO_EMAIL").split(",").map((s) => s.trim()),
      replyTo: d.email,
      subject,
      text,
    });
    return;
  }
  throw new Error(`Unknown CONTACT_PROVIDER "${provider}"`);
}

// ─── Handler ─────────────────────────────────────────────────────
export async function handler(event: HttpEvent): Promise<HttpResult> {
  const headers = Object.fromEntries(Object.entries(event.headers ?? {}).map(([k, v]) => [k.toLowerCase(), v ?? ""]));
  const origin = headers.origin ?? "";
  const allowed = env("CONTACT_ALLOWED_ORIGINS").split(",").map((s) => s.trim()).filter(Boolean);
  const cors: Record<string, string> = {
    "Content-Type": "application/json",
    Vary: "Origin",
    ...(allowed.includes(origin)
      ? {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        }
      : {}),
  };
  const reply = (statusCode: number, body: object): HttpResult => ({ statusCode, headers: cors, body: JSON.stringify(body) });

  const method = event.requestContext?.http?.method ?? "POST";
  if (method === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (method !== "POST") return reply(405, { message: "Method not allowed" });
  if (!allowed.includes(origin)) return reply(403, { message: "Origin not allowed" });

  const raw = event.isBase64Encoded ? Buffer.from(event.body ?? "", "base64").toString("utf8") : (event.body ?? "");
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return reply(413, { message: "Message too large" });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return reply(400, { message: "Invalid request" });
  }

  // Bots: filled honeypot or impossibly fast submission. Pretend success, send nothing.
  const probe = json as { website?: unknown; startedAt?: unknown };
  if ((typeof probe.website === "string" && probe.website.length > 0) ||
      (typeof probe.startedAt === "number" && Date.now() - probe.startedAt < MIN_FILL_MS)) {
    return reply(200, { ok: true });
  }

  const parsed = z.safeParse(contactSchema, json);
  if (!parsed.success) return reply(400, { message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error) });

  const ip = event.requestContext?.http?.sourceIp ?? "unknown";
  const ipHash = createHash("sha256").update(`${env("RATE_LIMIT_SALT", "local")}:${ip}`).digest("hex").slice(0, 32);
  try {
    const count = await hit(ipHash, Number(env("RATE_LIMIT_WINDOW_SECONDS", "3600")));
    if (count > Number(env("RATE_LIMIT_MAX", "5"))) return reply(429, { message: "Too many requests" });
  } catch (err) {
    // Fail open on limiter errors so real enquiries aren't lost; log for alerting.
    console.error("rate-limit error", err);
  }

  try {
    await deliver(parsed.data);
  } catch (err) {
    console.error("delivery error", err);
    return reply(502, { message: "We couldn't send your message right now." });
  }
  return reply(200, { ok: true });
}
