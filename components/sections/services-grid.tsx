import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { sectionHeadings } from "@/content/home";
import { SectionHeader } from "@/components/layout/section-header";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";
import { Scroller } from "@/components/ui/scroller";
import { cn } from "@/lib/utils";

export function ServicesGrid() {
  const h = sectionHeadings.services;
  return (
    <section id="services" className="section">
      <div className="container-page">
        <SectionHeader eyebrow={h.eyebrow} title={h.title} subtitle={h.subtitle} />
        <Reveal className="mt-10">
          <Scroller label="Our services">
            {services.map((s) => {
              const ai = s.accent === "ai";
              return (
                <li key={s.id} className="w-[85%] shrink-0 snap-start sm:w-[320px] lg:w-[340px]">
                  <Link
                    href={`/services/#${s.id}`}
                    className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-float sm:p-7"
                  >
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-md",
                        ai ? "bg-ai-50 text-ai-600" : "bg-brand-50 text-brand-600",
                      )}
                    >
                      <Icon name={s.icon} className="size-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.summary}</p>
                    <ul className="mt-5 space-y-2 text-sm text-ink-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <Check className={cn("mt-0.5 size-4 shrink-0", ai ? "text-ai-600" : "text-brand-600")} aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-700">
                      Learn more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      <span className="sr-only"> about {s.title}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </Scroller>
        </Reveal>
      </div>
    </section>
  );
}
