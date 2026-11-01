import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aiCapabilities, aiPage } from "@/content/ai";
import { solutions } from "@/content/solutions";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ChatDemo } from "@/components/sections/chat-demo";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Chatbots, RAG Assistants & AI Automation",
  description:
    "Website and WhatsApp chatbots, Slack and Teams assistants, RAG bots that answer from your documents, and AI integrations with your CRM and tools, built with human review and data privacy.",
  path: "/ai-solutions/",
});

export default function AISolutionsPage() {
  const { hero, ragSteps, channels, integrations, models, responsibleAi } = aiPage;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "AI Solutions", path: "/ai-solutions/" }])} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} tone="ai">
        <Button asChild size="lg">
          <Link href="/contact/?service=ai">
            Book a Free Consultation <ArrowRight />
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <a href="#demo">Try the demo</a>
        </Button>
      </PageHero>

      {/* What we build */}
      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="What we build" title="AI assistants and automations that fit your workflow" tone="ai" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aiCapabilities.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06} className="rounded-lg border border-line bg-white p-6 shadow-card">
                <span className="grid size-11 place-items-center rounded-md bg-ai-50 text-ai-600">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{c.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="section relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_20%,rgb(124_58_237/0.25),transparent),radial-gradient(40%_50%_at_10%_90%,rgb(37_99_235/0.22),transparent)]" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Interactive demo"
            title="See how a document-grounded assistant responds"
            subtitle="Pick a scenario. Notice the sources and the hand-off to a human. That's how we build real assistants."
            align="left"
            tone="dark"
          />
          <ChatDemo />
        </div>
      </section>

      {/* How RAG works */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="How it works"
            title="Answers from your documents, not the open internet"
            subtitle="Retrieval-augmented generation (RAG) grounds every answer in content you approve."
            tone="ai"
          />
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ragSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="rounded-lg bg-surface-2 p-6 ring-1 ring-line">
                <span className="font-display text-sm font-bold text-ai-600">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Channels, integrations, models */}
      <section className="section bg-surface-2">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold">Where it runs</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {channels.map((c) => (
                <li key={c}>
                  <Badge tone="ai" className="px-3 py-1 text-sm">{c}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">What it connects to</h2>
            <ul className="mt-5 space-y-2 text-ink-2">
              {integrations.map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden="true" className="text-ai-600">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Which AI models</h2>
            <p className="mt-5 leading-relaxed text-muted">{models}</p>
          </div>
        </div>
      </section>

      {/* Responsible AI */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="Responsible AI"
            title="Useful, honest and private by design"
            subtitle="AI is powerful but not infallible. Here's how we keep it safe for your business and your customers."
            tone="ai"
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {responsibleAi.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 0.06} className="flex gap-5 rounded-lg border border-line bg-white p-6 shadow-card">
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-gradient-to-br from-brand-600 to-ai-600 text-white">
                  <Icon name={r.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{r.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{r.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* By customer type */}
      <section className="section bg-surface-2">
        <div className="container-page">
          <SectionHeader eyebrow="Use cases" title="AI for every stage of business" />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {solutions.map((s) => (
              <li key={s.id} className="rounded-lg border border-line bg-white p-6 shadow-card">
                <Icon name={s.icon} className="size-6 text-brand-600" />
                <h3 className="mt-4 text-lg font-bold">{s.label}</h3>
                <ul className="mt-3 space-y-2 text-[0.95rem] text-muted">
                  {s.needs.slice(0, 3).map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand />
    </>
  );
}
