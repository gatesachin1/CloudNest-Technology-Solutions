import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { sectionHeadings } from "@/content/home";
import { site } from "@/content/site";
import { ContactForm } from "./contact-form";

export function CTABand() {
  const h = sectionHeadings.cta;
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_0%_0%,rgb(37_99_235/0.3),transparent),radial-gradient(50%_60%_at_100%_100%,rgb(124_58_237/0.28),transparent)]" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="text-white">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{h.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">{h.subtitle}</p>
          <ContactDetails className="mt-10" />
        </div>
        <div className="rounded-xl bg-white p-6 shadow-float sm:p-8">
          <ContactForm idPrefix="home" />
        </div>
      </div>
    </section>
  );
}

export function ContactDetails({ className, dark = true }: { className?: string; dark?: boolean }) {
  const item = dark ? "text-slate-200 hover:text-white" : "text-ink-2 hover:text-brand-700";
  const icon = dark ? "bg-white/10 text-brand-400 ring-white/10" : "bg-brand-50 text-brand-600 ring-brand-100";
  const rows = [
    { Icon: Phone, label: site.phone.display, href: `tel:${site.phone.e164}` },
    { Icon: MessageCircle, label: "Chat on WhatsApp", href: `https://wa.me/${site.whatsapp}`, external: true },
    { Icon: Mail, label: site.email, href: `mailto:${site.email}` },
    { Icon: Clock, label: site.hours.display },
  ];
  return (
    <ul className={`space-y-4 ${className ?? ""}`}>
      {rows.map(({ Icon, label, href, external }) => (
        <li key={label} className="flex items-center gap-3">
          <span className={`grid size-10 shrink-0 place-items-center rounded-md ring-1 ${icon}`}>
            <Icon className="size-4.5" aria-hidden="true" />
          </span>
          {href ? (
            <a
              href={href}
              className={`break-all font-medium transition-colors ${item}`}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
            </a>
          ) : (
            <span className={dark ? "text-slate-300" : "text-muted"}>{label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
