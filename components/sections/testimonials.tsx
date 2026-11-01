import { Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { sectionHeadings } from "@/content/home";
import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";

// Hidden entirely while content/testimonials.ts → `testimonials` is empty.
export function Testimonials() {
  if (!testimonials.length) return null;
  const h = sectionHeadings.testimonials;
  return (
    <section id="testimonials" className="section">
      <div className="container-page">
        <SectionHeader eyebrow={h.eyebrow} title={h.title} subtitle={h.subtitle || undefined} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-lg border border-line bg-white p-7 shadow-card">
                <Quote className="size-7 text-brand-200" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink-2">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="text-sm text-subtle">
                    {t.role}
                    {t.company ? `, ${t.company}` : ""}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
