import Image from "next/image";
import { caseStudies } from "@/content/case-studies";
import { sectionHeadings } from "@/content/home";
import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { isDev } from "@/lib/claims";

export function CaseStudies() {
  // Placeholder projects are previewed in `npm run dev` only, never published.
  const items = caseStudies.filter((c) => isDev || !c.placeholder);
  if (!items.length) return null;
  const h = sectionHeadings.work;
  return (
    <section id="work" className="section bg-surface-2">
      <div className="container-page">
        <SectionHeader eyebrow={h.eyebrow} title={h.title} subtitle={h.subtitle} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 0.06}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card">
                <div className="relative aspect-[16/10] bg-gradient-to-br from-brand-100 via-white to-ai-100">
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt={`Illustration: ${c.title}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-sm font-medium text-subtle">
                      Project image coming soon
                    </div>
                  )}
                  {c.placeholder && (
                    <Badge tone="warn" className="absolute top-3 left-3">
                      Placeholder
                    </Badge>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-wider text-brand-700 uppercase">{c.industry}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {c.services.map((s) => (
                      <li key={s}>
                        <Badge>{s}</Badge>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-t border-line pt-4 text-sm font-medium text-ink-2">
                    <span className="text-subtle">Result: </span>
                    {c.result}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
