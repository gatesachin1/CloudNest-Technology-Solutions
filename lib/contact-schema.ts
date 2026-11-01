// Shared by the contact form (client) and the contact Lambda (server).
// Uses zod/mini: same validation as full zod at a fraction of the bundle size.
import * as z from "zod/mini";

export const serviceOptions = [
  "Website",
  "Web app / e-commerce",
  "AI chatbot / assistant",
  "AI integration / automation",
  "Cloud hosting / DevOps",
  "Maintenance & support",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Under ₹25,000",
  "₹25,000 – ₹1,00,000",
  "₹1,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
] as const;

const phoneRe = /^[+()\-\s\d]{7,20}$/;

const text = (max: number) => z._default(z.optional(z.string().check(z.trim(), z.maxLength(max))), "");

export const contactSchema = z.object({
  name: z.string().check(z.trim(), z.minLength(2, "Please enter your name"), z.maxLength(100)),
  email: z.string().check(
    z.trim(),
    z.maxLength(200),
    z.refine((v) => z.safeParse(z.email(), v).success, "Please enter a valid email"),
  ),
  phone: z._default(
    z.optional(
      z.string().check(
        z.trim(),
        z.maxLength(20),
        z.refine((v) => v === "" || phoneRe.test(v), "Please enter a valid phone number"),
      ),
    ),
    "",
  ),
  company: text(150),
  service: z.enum(serviceOptions, { error: "Please choose a service" }),
  budget: z._default(z.optional(z.union([z.enum(budgetOptions), z.literal("")])), ""),
  message: z.string().check(z.trim(), z.minLength(10, "Please tell us a little more (10+ characters)"), z.maxLength(5000)),
  consent: z.literal(true, { error: "Please agree so we can reply to you" }),
  // Honeypot: real users never see or fill this field.
  website: z._default(z.optional(z.string().check(z.maxLength(0))), ""),
  // Set by the form on render. Submissions faster than MIN_FILL_MS are treated as bots.
  startedAt: z.optional(z.number()),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export const MIN_FILL_MS = 2500;

export function fieldErrors(error: { issues: readonly { path: readonly PropertyKey[]; message: string }[] }) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
