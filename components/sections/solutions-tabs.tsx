import { ArrowUpRight, Check } from "lucide-react";
import { solutions } from "@/content/solutions";
import { sectionHeadings } from "@/content/home";
import { SectionHeader } from "@/components/layout/section-header";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SolutionsTabs() {
  const h = sectionHeadings.solutions;
  return (
    <section id="solutions" className="section bg-surface-2">
      <div className="container-page">
        <SectionHeader eyebrow={h.eyebrow} title={h.title} subtitle={h.subtitle} />
        <Tabs defaultValue={solutions[0].id} className="mt-10">
          <div className="flex justify-center">
            <TabsList aria-label="Customer type">
              {solutions.map((s) => (
                <TabsTrigger key={s.id} value={s.id}>
                  <Icon name={s.icon} className="size-4" />
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {solutions.map((s) => (
            <TabsContent key={s.id} value={s.id} className="mt-10 focus-visible:outline-none">
              <div className="grid gap-8 rounded-xl border border-line bg-white p-6 shadow-card sm:p-10 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-10">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{s.headline}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold tracking-wider text-subtle uppercase">Typical needs</h4>
                  <ul className="mt-4 space-y-3">
                    {s.needs.map((n) => (
                      <li key={n} className="flex items-start gap-2.5 text-ink-2">
                        <Check className="mt-1 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-brand-50/60 p-5 ring-1 ring-brand-100">
                  <h4 className="font-sans text-xs font-semibold tracking-wider text-brand-700 uppercase">What you get</h4>
                  <ul className="mt-4 space-y-3">
                    {s.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-ink-2">
                        <ArrowUpRight className="mt-1 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
