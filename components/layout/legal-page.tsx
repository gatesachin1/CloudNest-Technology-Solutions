import type { LegalDoc } from "@/content/legal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { formatDate } from "@/lib/utils";

export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: doc.title, path }])} />
      <div className="container-page max-w-3xl py-16 sm:py-24">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{doc.title}</h1>
        <p className="mt-4 text-sm text-subtle">
          Last updated: <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
        </p>
        <p className="mt-8 text-lg leading-relaxed text-muted">{doc.intro}</p>
        <div className="mt-10 space-y-10">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl font-bold">{s.heading}</h2>
              <div className="mt-4 space-y-3 leading-relaxed text-ink-2">
                {s.body.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
