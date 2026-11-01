// Runs the contact Lambda handler locally: `npm run dev:contact`
// Reads .env.local / .env. With CONTACT_PROVIDER=console nothing is sent anywhere;
// submissions are printed to this terminal.
import http from "node:http";
import fs from "node:fs";

for (const file of [".env.local", ".env"]) {
  if (fs.existsSync(file)) process.loadEnvFile(file);
}
process.env.CONTACT_PROVIDER ??= "console";
process.env.CONTACT_ALLOWED_ORIGINS ??= "http://localhost:3000";

const { handler } = await import("./handler");
const port = Number(process.env.CONTACT_LOCAL_PORT ?? 8787);

http
  .createServer(async (req, res) => {
    if (!req.url?.startsWith("/contact")) {
      res.writeHead(404).end();
      return;
    }
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    const result = await handler({
      requestContext: { http: { method: req.method, sourceIp: req.socket.remoteAddress ?? "local" } },
      headers: req.headers as Record<string, string>,
      body: Buffer.concat(chunks).toString("utf8"),
    });
    res.writeHead(result.statusCode, result.headers).end(result.body);
  })
  .listen(port, () => {
    console.log(`Contact handler on http://localhost:${port}/contact (provider: ${process.env.CONTACT_PROVIDER})`);
    console.log(`Allowed origins: ${process.env.CONTACT_ALLOWED_ORIGINS}`);
  });
