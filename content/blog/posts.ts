// Blog index. Each post body is an HTML file next to this one: content/blog/<slug>.html
// Post URLs keep the original .html form (e.g. /blog/what-is-sre.html) so existing
// links and search rankings carry over unchanged.
//
// To add a post: create content/blog/<slug>.html (body only, starting at the first <p>),
// then add an entry below. Use <h2 id="..."> for headings so the table of contents works.
// Available callouts: <div class="post-callout">, "post-callout warn", "post-callout violet",
// <div class="post-code">, <div class="concept-grid"><div class="concept-card">.

export type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  tag: string;
  date: string; // ISO yyyy-mm-dd
  readingTime: string;
  author: string;
};

export const posts: Post[] = [
  {
    slug: "what-is-sre",
    title: "What is Site Reliability Engineering (SRE)?",
    description:
      "What is Site Reliability Engineering (SRE)? A plain-English explanation of SRE principles — SLOs, error budgets, toil, and how it differs from traditional DevOps.",
    excerpt:
      "SRE is how Google keeps its services running at scale. We explain what SRE actually means, how it differs from traditional ops, and what it looks like for a business your size.",
    tag: "SRE",
    date: "2025-05-20",
    readingTime: "6 min read",
    author: "Cloudnest Team",
  },
  {
    slug: "aws-s3-static-website-hosting",
    title: "Complete Guide to Hosting Your Website on AWS S3",
    description:
      "Step-by-step guide to hosting a static website on AWS S3 — bucket creation, static website config, public bucket policy, and Terraform automation.",
    excerpt:
      "AWS S3 static hosting is cheap, reliable, and scalable. This step-by-step guide walks you through bucket creation, public policy, and getting your site live in under 30 minutes.",
    tag: "AWS",
    date: "2025-05-10",
    readingTime: "8 min read",
    author: "Cloudnest Team",
  },
  {
    slug: "devops-best-practices-2025",
    title: "DevOps Best Practices for Growing Businesses in India",
    description:
      "A practical DevOps playbook for Indian SMBs — CI/CD pipelines, Infrastructure as Code, monitoring, and deployment automation. Stop deploying via FTP.",
    excerpt:
      "Most Indian SMBs still deploy manually via FTP or SSH. Here's the practical DevOps playbook — CI/CD, monitoring, and IaC — that makes deployments safe and fast.",
    tag: "DevOps",
    date: "2025-05-01",
    readingTime: "7 min read",
    author: "Cloudnest Team",
  },
];

export const postUrl = (slug: string) => `/blog/${slug}.html`;
