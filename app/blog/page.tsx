import { ArrowRight, Calendar, Clock } from "lucide-react";
import { postUrl } from "@/content/blog/posts";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Blog: Web, AI, Cloud & DevOps Insights",
  description: "Practical guides on websites, AI, AWS cloud, DevOps and site reliability for growing businesses in India.",
  path: "/blog/",
});

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }])} />
      <PageHero
        eyebrow="Blog"
        title="Insights on web, AI and cloud"
        subtitle="Practical, jargon-free guides for growing businesses."
      />
      <section className="section bg-surface-2">
        <div className="container-page">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.06}>
                {/* Plain <a>: post URLs end in .html, which client-side routing doesn't prefetch. */}
                <a
                  href={postUrl(p.slug)}
                  className="group flex h-full flex-col rounded-lg border border-line bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-float"
                >
                  <Badge tone="brand" className="w-fit">{p.tag}</Badge>
                  <h2 className="mt-4 text-xl font-bold leading-snug group-hover:text-brand-700">{p.title}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{p.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-subtle">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-4" aria-hidden="true" />
                      <time dateTime={p.date}>{formatDate(p.date)}</time>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-4" aria-hidden="true" />
                      {p.readingTime}
                    </span>
                  </div>
                  <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
