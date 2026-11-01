import { about } from "@/content/about";
import { site } from "@/content/site";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";
import { CTABand } from "@/components/sections/cta-band";
import { WhyUs } from "@/components/sections/why-us";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { isDev, unverifiedClaims, verifiedClaims } from "@/lib/claims";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Cloudnest Technology Solutions, Pune",
  description:
    "Cloudnest is a Pune-based technology partner building websites, AI assistants and automations on secure AWS infrastructure for small businesses, startups and enterprises.",
  path: "/about/",
});

const factIds = ["location", "aws-native", "support-hours", "years-experience", "projects-delivered", "aws-certified", "monitoring-24x7"];

export default function AboutPage() {
  const facts = verifiedClaims(factIds);
  const todo = isDev ? unverifiedClaims(factIds) : [];
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])} />
      <PageHero eyebrow={about.hero.eyebrow} title={about.hero.title} subtitle={about.hero.subtitle} />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{about.story.title}</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              {about.story.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="h-fit rounded-xl border border-line bg-surface-2 p-7">
            <h2 className="font-sans text-sm font-semibold tracking-wider text-subtle uppercase">At a glance</h2>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-sm text-subtle">Company</dt>
                <dd className="font-semibold text-ink">{site.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-subtle">Location</dt>
                <dd className="font-semibold text-ink">
                  {site.address.locality}, {site.address.region}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-subtle">Hours</dt>
                <dd className="font-semibold text-ink">{site.hours.display}</dd>
              </div>
            </dl>
            {(facts.length > 0 || todo.length > 0) && (
              <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-ink-2">
                {facts.map((f) => (
                  <li key={f.id}>✓ {f.text}</li>
                ))}
                {todo.map((f) => (
                  <li key={f.id} title={f.source} className="rounded border border-dashed border-warn/60 bg-warn-50 px-2 py-1 text-xs text-warn">
                    TODO (hidden in prod): {f.text}
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </section>

      {about.team.length > 0 && (
        <section className="section bg-surface-2">
          <div className="container-page">
            <SectionHeader eyebrow="Team" title="The people behind Cloudnest" />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {about.team.map((t) => (
                <li key={t.name} className="rounded-lg border border-line bg-white p-6 shadow-card">
                  <h3 className="text-lg font-bold">{t.name}</h3>
                  <p className="text-sm text-brand-700">{t.role}</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{t.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section bg-surface-2">
        <div className="container-page">
          <SectionHeader eyebrow="Our values" title="What we stand for" subtitle="The decisions we make every day, when no one is watching." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 3) * 0.06} className="rounded-lg border border-line bg-white p-6 shadow-card">
                <span className="grid size-11 place-items-center rounded-md bg-brand-50 text-brand-600">
                  <Icon name={v.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{v.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Expertise" title="Our technical strengths" />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {about.expertise.map((e) => (
              <div key={e.title} className="bg-white p-7">
                <dt className="text-lg font-bold text-ink">{e.title}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{e.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <WhyUs />
      <CTABand />
    </>
  );
}
