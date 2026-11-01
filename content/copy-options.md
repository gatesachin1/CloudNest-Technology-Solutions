# Hero copy options (A/B)

The live H1 is set in `content/home.ts` → `hero.title`. To test an alternative, swap the string there.

| Variant | H1 | Notes |
|---|---|---|
| **A (live)** | Smart Websites. AI Automation. Enterprise-Grade Cloud. | Names all three pillars; strongest for SEO and enterprise buyers. |
| B | Build Faster. Automate Smarter. Grow Bigger. | Outcome-led, punchier; less specific about *what* we do. Pair with a subhead that names websites + AI. |
| C | From Website to AI Assistant: Your Digital Growth Partner. | Journey framing; good for small businesses buying their first site. |

**Subhead (shared):** We build fast websites, set up AI chatbots and integrations, and run it all on secure AWS infrastructure, for startups through enterprises.

## How to A/B test

The site is a static export, so run tests at the edge or with a client-side tool:

1. Simplest: change the H1 for 2–4 weeks at a time and compare "Book a Free Consultation" clicks / contact-form submissions in your analytics.
2. Proper split test: use CloudFront Functions (or Amplify's branch-based split traffic) to route 50% of visitors to a build with variant B.
