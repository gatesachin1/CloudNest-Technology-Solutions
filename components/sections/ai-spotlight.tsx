import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aiCapabilities } from "@/content/ai";
import { sectionHeadings } from "@/content/home";
import { SectionHeader } from "@/components/layout/section-header";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ChatDemo } from "./chat-demo";

export function AISpotlight() {
  const h = sectionHeadings.ai;
  return (
    <section id="ai" className="section relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_20%,rgb(124_58_237/0.25),transparent),radial-gradient(40%_50%_at_10%_90%,rgb(37_99_235/0.22),transparent)]" />
      <div className="container-page relative grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader eyebrow={h.eyebrow} title={h.title} subtitle={h.subtitle} align="left" tone="dark" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {aiCapabilities.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06}>
                <span className="grid size-10 place-items-center rounded-md bg-white/10 text-ai-300 ring-1 ring-white/10">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{c.description}</p>
              </Reveal>
            ))}
          </ul>
          <Button asChild variant="light" className="mt-10">
            <Link href="/ai-solutions/">
              Explore AI solutions <ArrowRight />
            </Link>
          </Button>
        </div>
        <Reveal>
          <ChatDemo />
        </Reveal>
      </div>
    </section>
  );
}
