"use client";

import { useEffect, useRef, useState } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import * as z from "zod/mini";
import { budgetOptions, contactSchema, fieldErrors, serviceOptions } from "@/lib/contact-schema";
import { site } from "@/content/site";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

// "mailto": no backend configured (e.g. a plain S3 upload), so the enquiry opens in the visitor's email app.
type Status = "idle" | "submitting" | "success" | "mailto" | "error";

function mailtoHref(d: Record<string, string | number | boolean>) {
  const subject = `New enquiry: ${d.service} from ${d.name}${d.company ? ` (${d.company})` : ""}`;
  const body = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || "-"}`,
    `Company: ${d.company || "-"}`,
    `Service: ${d.service}`,
    `Budget: ${d.budget || "-"}`,
    "",
    String(d.message),
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const planToService: Record<string, (typeof serviceOptions)[number]> = {
  starter: "Website",
  business: "Website",
  enterprise: "Web app / e-commerce",
};

export function ContactForm({ idPrefix = "cf" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [defaults, setDefaults] = useState<{ service: string; message: string }>({ service: "", message: "" });
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Prefill from links like /contact/?plan=business or ?service=ai (static export: read on the client).
    const q = new URLSearchParams(window.location.search);
    const plan = q.get("plan");
    const service = q.get("service");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDefaults({
      service: plan ? (planToService[plan] ?? "") : service === "ai" ? "AI chatbot / assistant" : "",
      message: plan ? `I'm interested in the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.` : "",
    });
  }, []);

  const id = (name: string) => `${idPrefix}-${name}`;
  const invalid = (name: string) =>
    errors[name] ? { "aria-invalid": true as const, "aria-describedby": `${id(name)}-error` } : {};

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      service: String(fd.get("service") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      startedAt: startedAt.current,
    };

    const parsed = z.safeParse(contactSchema, payload);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});

    if (!endpoint) {
      window.location.href = mailtoHref(payload);
      setStatus("mailto");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { errors?: Record<string, string>; message?: string };
      if (res.ok) {
        setStatus("success");
        return;
      }
      setStatus("error");
      if (res.status === 400 && body.errors) setErrors(body.errors);
      setFormError(
        res.status === 429
          ? "Too many messages from your connection. Please try again later, or reach us directly."
          : (body.message ?? "Something went wrong sending your message."),
      );
    } catch {
      setStatus("error");
      setFormError("We couldn't reach the server. Please check your connection or contact us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-10 text-center" role="status">
        <CircleCheck className="size-12 text-success" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold">Thanks, we&apos;ve got your message</h3>
        <p className="mt-2 max-w-sm text-muted">
          We&apos;ll reply within one business day ({site.hours.display}). Need us sooner? Call{" "}
          <a href={`tel:${site.phone.e164}`} className="font-semibold text-brand-700">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  if (status === "mailto") {
    return (
      <div className="flex flex-col items-center py-10 text-center" role="status">
        <Send className="size-12 text-brand-600" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold">Almost done: press Send in your email app</h3>
        <p className="mt-2 max-w-sm text-muted">
          We&apos;ve opened a message to us with your details filled in. If nothing opened, email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">
            {site.email}
          </a>{" "}
          or call{" "}
          <a href={`tel:${site.phone.e164}`} className="font-semibold text-brand-700">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={formError ? id("form-error") : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Your name" error={errors.name}>
          <Input id={id("name")} name="name" autoComplete="name" required {...invalid("name")} />
        </Field>
        <Field id={id("email")} label="Work email" error={errors.email}>
          <Input id={id("email")} name="email" type="email" autoComplete="email" required {...invalid("email")} />
        </Field>
        <Field id={id("phone")} label="Phone / WhatsApp" optional error={errors.phone}>
          <Input id={id("phone")} name="phone" type="tel" autoComplete="tel" {...invalid("phone")} />
        </Field>
        <Field id={id("company")} label="Company" optional error={errors.company}>
          <Input id={id("company")} name="company" autoComplete="organization" {...invalid("company")} />
        </Field>
        <Field id={id("service")} label="What do you need?" error={errors.service}>
          <NativeSelect
            id={id("service")}
            name="service"
            required
            key={`s-${defaults.service}`}
            defaultValue={defaults.service}
            {...invalid("service")}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </NativeSelect>
        </Field>
        <Field id={id("budget")} label="Budget" optional error={errors.budget}>
          <NativeSelect id={id("budget")} name="budget" defaultValue="" {...invalid("budget")}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </NativeSelect>
        </Field>
      </div>
      <Field id={id("message")} label="Tell us about your project" error={errors.message}>
        <Textarea
          id={id("message")}
          name="message"
          required
          key={`m-${defaults.message}`}
          defaultValue={defaults.message}
          placeholder="What are you trying to achieve? Any timelines or tools we should know about?"
          {...invalid("message")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-4 shrink-0 rounded border-line accent-brand-600"
            {...invalid("consent")}
          />
          <span>
            I agree that Cloudnest may use these details to reply to my enquiry, as described in the{" "}
            <a href="/privacy/" className="font-medium text-brand-700 underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id={`${id("consent")}-error`} className="mt-1.5 text-sm text-danger" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      {formError && (
        <div id={id("form-error")} role="alert" className="rounded-md bg-red-50 p-4 text-sm text-danger ring-1 ring-red-200">
          {formError} Email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>{" "}
          or{" "}
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            message us on WhatsApp
          </a>
          .
        </div>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <LoaderCircle className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message <Send />
          </>
        )}
      </Button>
    </form>
  );
}
