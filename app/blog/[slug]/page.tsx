import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, ChevronRight, Clock, User } from "lucide-react";
import { postUrl } from "@/content/blog/posts";
import { site } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { getPost, getPosts } from "@/lib/blog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

// Rendered at /blog/<slug>/ and copied to /blog/<slug>.html by scripts/postbuild.mjs.
// The .html URL is canonical, matching the original site.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const meta = pageMetadata({ title: post.title, description: post.description, path: postUrl(slug), type: "article" });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date, authors: [post.author] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getPosts().filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@id": `${site.url}/#organization` },
            mainEntityOfPage: absoluteUrl(postUrl(slug)),
            url: absoluteUrl(postUrl(slug)),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: post.title, path: postUrl(slug) },
          ]),
        ]}
      />

      <header className="relative overflow-hidden border-b border-line">
        <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,#000_30%,transparent_100%)]" />
        <div className="container-page max-w-3xl py-14 text-center sm:py-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-1.5 text-sm text-subtle">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="hover:text-ink">Home</Link>
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </li>
              <li>
                <Link href="/blog/" className="hover:text-ink">Blog</Link>
              </li>
            </ol>
          </nav>
          <Badge tone="brand" className="mt-6">{post.tag}</Badge>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-subtle">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" /> {post.readingTime}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="size-4" aria-hidden="true" /> {post.author}
            </span>
          </div>
        </div>
      </header>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 lg:py-20">
        {/* Trusted, first-party content from content/blog/*.html */}
        <article className="prose-post mx-auto w-full max-w-[720px]" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {post.toc.length > 0 && (
            <nav aria-label="Table of contents" className="rounded-lg border border-line p-6">
              <h2 className="font-sans text-xs font-semibold tracking-wider text-subtle uppercase">On this page</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {post.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-muted hover:text-brand-700">{t.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {related.length > 0 && (
            <div className="rounded-lg border border-line p-6">
              <h2 className="font-sans text-xs font-semibold tracking-wider text-subtle uppercase">Related articles</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {related.map((r) => (
                  <li key={r.slug}>
                    <a href={postUrl(r.slug)} className="font-medium text-ink hover:text-brand-700">{r.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-lg bg-ink p-6 text-white">
            <h2 className="text-lg font-bold text-white">Need help with this?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              We set up cloud, DevOps and AI for growing businesses. Free consultation.
            </p>
            <Button asChild variant="light" size="sm" className="mt-5 w-full">
              <Link href="/contact/">
                Book a free call <ArrowRight />
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}
