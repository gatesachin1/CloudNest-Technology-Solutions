import fs from "node:fs";
import path from "node:path";
import { posts, type Post } from "@/content/blog/posts";

// Build-time only (static export): reads post bodies from content/blog/<slug>.html.

export function getPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): (Post & { html: string; toc: { id: string; text: string }[] }) | null {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  const html = fs.readFileSync(path.join(process.cwd(), "content", "blog", `${slug}.html`), "utf8");
  const toc = [...html.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, "").trim(),
  }));
  return { ...post, html, toc };
}
