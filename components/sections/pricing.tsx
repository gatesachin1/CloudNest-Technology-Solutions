import Link from "next/link";
import { Check, Minus, Sparkles } from "lucide-react";
import { aiAddOns, pricingNote, pricingTiers } from "@/content/pricing";
import { sectionHeadings } from "@/content/home";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn, formatINR } from "@/lib/utils";

export function Pricing() {
  const h = sectionHeadings.pricing;
  return (
    <section id="pricing" className="section bg-surface-2">
      <div className="container-page">
        <SectionHeader eyebrow={h.eyebrow} title={h.title} subtitle={h.subtitle} />

        <ul className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {pricingTiers.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 0.06}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-xl border p-7 sm:p-8",
                  t.featured ? "border-brand-600 bg-ink text-white shadow-float" : "border-line bg-white shadow-card",
                )}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h3 className={cn("text-lg font-bold", t.featured && "text-white")}>{t.name}</h3>
                <p className={cn("mt-2 min-h-12 text-sm leading-relaxed", t.featured ? "text-slate-300" : "text-muted")}>
                  {t.description}
                </p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  {t.priceINR === null ? (
                    <span className="font-display text-4xl font-extrabold tracking-tight">Custom</span>
                  ) : (
                    <>
                      <span className="font-display text-4xl font-extrabold tracking-tight">₹{formatINR(t.priceINR)}</span>
                      {t.priceSuffix && (
                        <span className={cn("text-sm", t.featured ? "text-slate-400" : "text-subtle")}>{t.priceSuffix}</span>
                      )}
                    </>
                  )}
                </p>
                <ul className="mt-7 space-y-3 text-[0.95rem]">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={cn("mt-0.5 size-4.5 shrink-0", t.featured ? "text-brand-400" : "text-brand-600")} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                  {t.excluded?.map((f) => (
                    <li key={f} className={cn("flex items-start gap-2.5", t.featured ? "text-slate-500" : "text-subtle")}>
                      <Minus className="mt-0.5 size-4.5 shrink-0" aria-hidden="true" />
                      <span>
                        <span className="sr-only">Not included: </span>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={t.featured ? "primary" : "secondary"} className="mt-8 w-full">
                  <Link href={t.cta.href}>
                    {t.cta.label}
                    <span className="sr-only"> with the {t.name} plan</span>
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* AI add-ons */}
        <div className="mt-8 rounded-xl border border-ai-100 bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <Sparkles className="size-5 text-ai-600" aria-hidden="true" /> AI add-ons
            </h3>
            <p className="text-sm text-muted">Add to any plan</p>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {aiAddOns.map((a) => (
              <li key={a.name} className="flex flex-col rounded-lg bg-ai-50/60 p-5 ring-1 ring-ai-100">
                <span className="font-semibold text-ink">{a.name}</span>
                <span className="mt-1 text-sm leading-relaxed text-muted">{a.description}</span>
                <Link
                  href="/contact/?service=ai"
                  className="mt-4 text-sm font-semibold text-ai-700 underline-offset-4 hover:underline"
                >
                  {a.price}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-subtle">{pricingNote}</p>
      </div>
    </section>
  );
}
