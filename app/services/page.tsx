import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { services } from "@/content/services";
import { PageHero } from "@/components/layout/page-hero";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd, breadcrumbSchema, serviceSchemas } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Services: Web Development, AI Chatbots, AI Integrations & AWS Cloud",
  description:
    "Business websites, web apps and e-commerce, AI chatbots and RAG assistants, AI integrations and automation, AWS cloud hosting, DevOps and ongoing support from Cloudnest, Pune.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[...serviceSchemas(services), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }])]} />
      <PageHero
        eyebrow="Services"
        title="Everything you need to build, automate and run online"
        subtitle="Websites and web apps, AI assistants and automations, and the secure AWS cloud that keeps it all running."
      />

      {/* jump links */}
      <nav aria-label="Services on this page" className="sticky top-16 z-30 border-b border-line bg-white/90 backdrop-blur lg:top-[72px]">
        <ul className="container-page flex gap-2 overflow-x-auto py-3 text-sm [scrollbar-width:none]">
          {services.map((s) => (
            <li key={s.id} className="shrink-0">
              <a href={`#${s.id}`} className="block rounded-full px-3.5 py-1.5 font-medium text-muted ring-1 ring-line hover:bg-surface-2 hover:text-ink">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-page divide-y divide-line">
        {services.map((s, i) => {
          const ai = s.accent === "ai";
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <span className={cn("grid size-14 place-items-center rounded-lg", ai ? "bg-ai-50 text-ai-600" : "bg-brand-50 text-brand-600")}>
                  <Icon name={s.icon} className="size-7" />
                </span>
                <h2 id={`${s.id}-title`} className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{s.intro}</p>
                <p className="mt-6 flex items-center gap-2 text-sm font-medium text-ink-2">
                  <Clock className="size-4 text-subtle" aria-hidden="true" /> {s.timeline}
                </p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-ink">Good for</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {s.goodFor.map((g) => (
                      <li key={g}>
                        <Badge tone={ai ? "ai" : "brand"}>{g}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="mt-8">
                  <Link href={`/contact/`}>
                    Discuss your project <ArrowRight />
                  </Link>
                </Button>
              </Reveal>
              <Reveal delay={0.08} className="rounded-xl border border-line bg-surface-2 p-7 sm:p-9">
                <h3 className="text-lg font-bold">What&apos;s included</h3>
                <ul className="mt-6 space-y-4">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-ink-2">
                      <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", ai ? "bg-ai-600" : "bg-brand-600")}>
                        <Check className="size-3 text-white" aria-hidden="true" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          );
        })}
      </div>

      <CTABand />
    </>
  );
}
