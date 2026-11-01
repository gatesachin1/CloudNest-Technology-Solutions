# Cloudnest Technology Solutions: Website

Marketing site for Cloudnest Technology Solutions (Pune, India): websites, AI chatbots, AI integrations and AWS cloud.

- **Stack:** Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS 4 · shadcn/ui-style components on Radix · Framer Motion (chat demo) · Zod
- **Hosting:** static files on S3 + CloudFront (or Amplify Hosting). The contact form posts to a small Lambda that sends email via Amazon SES.
- **Content:** every piece of copy, price, FAQ, testimonial and claim lives in [`/content`](content/). You can edit text without touching components.

> Before launch, work through **[CONTENT_TODO.md](CONTENT_TODO.md)**. It lists every placeholder and unverified claim.

---

## 1. Run locally

Requirements: Node.js 22+ (developed on Node 24), npm.

```bash
npm install
cp .env.example .env.local        # already done if .env.local exists

# Terminal 1: the website (hot reload)
npm run dev                       # http://localhost:3000

# Terminal 2: the contact form backend (prints submissions, sends nothing)
npm run dev:contact               # http://localhost:8787/contact
```

In dev mode, unverified marketing claims show as dashed orange **TODO** chips so you can review them. Production builds hide them.

### Preview the production build

```bash
npm run build      # static export → /out
npm start          # http://localhost:3000, with production redirects and clean URLs
```

`npm start` runs the **same CloudFront Function** used in production ([infra/cloudfront/viewer-request.js](infra/cloudfront/viewer-request.js)), so you can test the 301 redirects locally (e.g. open `/about.html`).

### Quality checks

```bash
npm run lint        # ESLint (Next.js core-web-vitals + TypeScript rules)
npm run typecheck   # tsc --noEmit
npm run build       # static export + postbuild
npm run build:lambda
npm run check       # all of the above
```

---

## 2. Editing content

| What | File |
|---|---|
| Company name, phone, email, hours, nav, SEO title/description | `content/site.ts` |
| Hero + section headings | `content/home.ts` (H1 A/B options: `content/copy-options.md`) |
| Services (homepage cards + /services sections) | `content/services.ts` |
| AI capabilities, chat demo script, /ai-solutions page | `content/ai.ts` |
| Small business / Startups / Enterprise tabs | `content/solutions.ts` |
| How we work | `content/process.ts` |
| Case studies | `content/case-studies.ts` |
| Why Cloudnest | `content/why.ts` |
| Pricing + AI add-ons | `content/pricing.ts` |
| Testimonials (section hidden when empty) | `content/testimonials.ts` |
| FAQ (also emitted as FAQPage JSON-LD) | `content/faq.ts` |
| About page | `content/about.ts` |
| Privacy / Terms / Cookies | `content/legal.ts` |
| **Marketing claims (stats, SLAs, certifications)** | `content/claims.json` |
| Blog posts | `content/blog/posts.ts` + `content/blog/<slug>.html` |

**Claims rule:** a claim appears on the site only if it's `"verified": true` in `content/claims.json`. Don't add numbers directly to other content files.

**Adding a blog post:** create `content/blog/<slug>.html` (body HTML only, use `<h2 id="...">` headings for the table of contents), then add an entry in `content/blog/posts.ts`. It's published at `/blog/<slug>.html` and added to the sitemap automatically.

**Icons** in content files are names (e.g. `"bot"`, `"cloud"`) mapped in `components/ui/icon.tsx`.

---

## 3. Environment variables

See [.env.example](.env.example). Never commit `.env*` files (they're git-ignored) and never put AWS keys in them.

| Variable | Used by | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | site build | Canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | site build | Contact form POST URL (local: `http://localhost:8787/contact`; prod: Terraform output `contact_endpoint`) |
| `CONTACT_PROVIDER` | contact handler | `console` (log only), `ses`, or `smtp` (e.g. Gmail with an App Password) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | contact handler | SMTP settings, only for `CONTACT_PROVIDER=smtp`. Defaults: `smtp.gmail.com`, `465` |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | contact handler | Recipient and SES-verified sender |
| `CONTACT_ALLOWED_ORIGINS` | contact handler | CORS allow-list |
| `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_SECONDS` | contact handler | Per-IP limit (default 5/hour) |
| `RATE_LIMIT_TABLE` | contact handler | DynamoDB table (empty = in-memory, for local) |
| `RATE_LIMIT_SALT` | contact handler | Secret for hashing IPs |
| `AWS_REGION` | contact handler | SES / DynamoDB region |

`NEXT_PUBLIC_*` values are baked in at build time, so **rebuild after changing them**.

### Contact form protections
Client and server share one Zod schema (`lib/contact-schema.ts`). The handler checks in this order: CORS allow-list → 20 KB body limit → honeypot field + minimum fill time (bots get a fake "success") → validation → per-IP rate limit (salted IP hash in DynamoDB, auto-expiring) → SES delivery. API Gateway throttling adds a global cap.

---

## 4. Deploying to AWS

> Nothing in this repo creates AWS resources automatically. Run these steps yourself when you're ready.

### Option A (recommended): S3 + CloudFront + Lambda via Terraform

Infrastructure lives in [`infra/terraform`](infra/terraform):
- private S3 bucket
- CloudFront with OAC, HTTP/2+3 and security headers (HSTS, CSP, etc.)
- ACM certificate
- CloudFront Function for redirects
- API Gateway + Lambda + DynamoDB + SES for the contact form
- optional Route 53 records

```bash
# 1. Build the Lambda bundle (Terraform zips it)
npm run build:lambda

# 2. Configure
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars    # fill in; it's git-ignored
terraform init
terraform plan                                   # review carefully
terraform apply
```

- **DNS not on Route 53?** Leave `route53_zone_id` empty. `terraform apply` will pause on certificate validation: add the CNAMEs from `terraform output acm_validation_records` at your DNS provider, and the DKIM CNAMEs from `ses_dkim_records`.
- **SES sandbox:** new SES accounts can only send to verified addresses. Request production access in the SES console (or verify the recipient address) before going live.

```bash
# 3. Build the site against the real endpoint
#    In .env.production (or your CI): NEXT_PUBLIC_CONTACT_ENDPOINT=<terraform output contact_endpoint>
npm run build

# 4. Upload + invalidate
SITE_BUCKET=$(terraform -chdir=infra/terraform output -raw site_bucket) \
CF_DISTRIBUTION_ID=$(terraform -chdir=infra/terraform output -raw cloudfront_distribution_id) \
./scripts/deploy.sh
```

5. Test via the `cloudfront_domain` output (or a hosts-file override), then point the apex + `www` DNS records to CloudFront.
6. When the new site is live, delete the **old** public buckets (`cloudnesttechnologysolutions.in`, `www.cloudnesttechnologysolutions.in`) by hand. The new stack uses a separate private bucket, so nothing old is touched until you choose to remove it. The previous Terraform is kept for reference at `infra/terraform/legacy-s3-website.tf.txt`.

`scripts/deploy.sh` sets cache headers (immutable for `/_next/static`, revalidate for HTML) and uploads the extension-less Open Graph images (`/opengraph-image`, `/twitter-image`) with `Content-Type: image/png`.

### Option B: keep the current S3 static-website buckets (no CloudFront)

The new build also works on the existing setup: `trailingSlash` output means `/about/` serves `about/index.html`, and S3 redirects `/about` → `/about/`.
1. Add the 301 rules from [infra/s3-website/routing-rules.json](infra/s3-website/routing-rules.json) under the bucket's *Static website hosting → Redirection rules*.
2. `SITE_BUCKET=cloudnesttechnologysolutions.in ./scripts/deploy.sh`

Limitations: no HTTPS on the S3 website endpoint, no security headers, and `/blog/<slug>/` won't redirect to the `.html` URL (the canonical tag still points search engines to the right URL). The contact form still needs the Lambda/API from Option A (`contact.tf`).

### Option C: AWS Amplify Hosting

`amplify.yml` is included. Connect the repo in Amplify, set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_ENDPOINT` as environment variables, and paste [infra/amplify/redirects.json](infra/amplify/redirects.json) into *Rewrites and redirects*.

---

## 5. Redirects and URLs

| Old URL | New URL | How |
|---|---|---|
| `/index.html` | `/` | 301 |
| `/about.html` | `/about/` | 301 |
| `/services.html` | `/services/` | 301 |
| `/contact.html` | `/contact/` | 301 |
| `/blog/` | `/blog/` | unchanged |
| `/blog/index.html` | `/blog/` | 301 |
| `/blog/<post>.html` | `/blog/<post>.html` | **unchanged** (canonical) |
| `/blog/<post>` or `/blog/<post>/` | `/blog/<post>.html` | 301 |
| `www.` | apex | 301 |
| any path without a trailing slash | same path + `/` | 301 |

Query strings are preserved. The logic lives in one file, [infra/cloudfront/viewer-request.js](infra/cloudfront/viewer-request.js), used by both CloudFront and `npm start`. Amplify and S3-website equivalents are in `infra/amplify` and `infra/s3-website`. As a last resort, `scripts/postbuild.mjs` also writes meta-refresh pages at `about.html`, `services.html` and `contact.html`.

---

## 6. Project structure

```
app/                     Routes: /, services, ai-solutions, about, contact, blog, blog/[slug],
                         privacy, terms, cookies, sitemap.ts, robots.ts, OG/Twitter images
components/
  layout/                Nav, Footer, Logo, PageHero, SectionHeader, LegalPage
  sections/              Hero, TrustStrip, ServicesGrid, AISpotlight, ChatDemo, SolutionsTabs,
                         Process, CaseStudies, WhyUs, Pricing, Testimonials, FAQ, CTABand, ContactForm
  mockups/               Hero browser + chat mockup (pure CSS)
  motion/                Reveal (CSS) + RevealObserver
  seo/                   JSON-LD (Organization, LocalBusiness, Service, FAQPage, BlogPosting, Breadcrumbs)
  ui/                    Button, Badge, Tabs, Accordion, form fields, Icon map
content/                 All editable copy and data
lib/                     contact-schema (shared client/server), claims, seo, blog loader
infra/
  cloudfront/            Viewer-request function (redirects, clean URLs)
  contact-lambda/        Contact handler + local dev server
  terraform/             S3, CloudFront, ACM, Lambda, API Gateway, DynamoDB, SES
  s3-website/, amplify/  Redirect rules for the alternative hosting options
scripts/                 postbuild, local preview server, deploy
```

## 7. Notes

- **Performance:**
  - CSS is inlined.
  - Body text uses the system font stack; headings use one preloaded variable font.
  - Scroll animations are CSS-only. Framer Motion loads only with the AI chat demo.
  - `zod/mini` keeps validation small.
  - Lighthouse mobile on the local preview: Accessibility, Best Practices and SEO score 100 on every page. Performance ranged from about 75 to 97, depending on the page and the machine's load. LCP is about 3 s and CLS is 0. The remaining cost is mostly React hydration.
  - Re-test with PageSpeed Insights once the site is behind CloudFront.
  - Next levers if you need more:
    - lazy-load the chat demo
    - replace the Radix dialog in the mobile nav
    - trim homepage sections
- **Accessibility:**
  - Skip link, visible focus styles and keyboard-operable menus, tabs and accordion.
  - `aria-live` chat demo; colours meet WCAG AA contrast.
  - `prefers-reduced-motion` is respected.
- **UI components:** the shadcn/ui pattern (Radix primitives + Tailwind + `cva`), written directly into `components/ui`. To add more, use `npx shadcn@latest add <component>` and adapt the imports.
