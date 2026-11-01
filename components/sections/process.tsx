import { processSteps } from "@/content/process";
import { sectionHeadings } from "@/content/home";
import { SectionHeader } from "@/components/layout/section-header";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";

export function Process() {
  const h = sectionHeadings.process;
  return (
    <section id="process" className="section">
      <div className="container-page">
        <SectionHeader eyebrow={h.eyebrow} title={h.title} subtitle={h.subtitle} />
        <div className="relative mt-14">
        <div
          aria-hidden="true"
          className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-brand-200 via-ai-300 to-brand-200 lg:block"
        />
        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                <span className="relative grid size-12 place-items-center rounded-full bg-white text-brand-600 shadow-card ring-1 ring-line">
                  <Icon name={step.icon} className="size-5" />
                </span>
                <span className="text-xs font-semibold tracking-wider text-subtle uppercase lg:mt-4">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
