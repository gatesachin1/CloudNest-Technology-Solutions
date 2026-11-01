import { whyUs } from "@/content/why";
import { sectionHeadings } from "@/content/home";
import { SectionHeader } from "@/components/layout/section-header";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";

export function WhyUs() {
  const h = sectionHeadings.why;
  return (
    <section id="why" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeader eyebrow={h.eyebrow} title={h.title} subtitle={h.subtitle} align="left" className="lg:sticky lg:top-28 lg:self-start" />
        <ul className="grid gap-5 sm:grid-cols-2">
          {whyUs.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.06} className="rounded-lg border border-line bg-white p-6 shadow-card">
              <span className="grid size-11 place-items-center rounded-md bg-gradient-to-br from-brand-600 to-ai-600 text-white">
                <Icon name={w.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{w.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{w.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
