# Content TODO: replace before launch

Everything below is a placeholder, an unverified claim, or a decision only you can make.
Run `npm run dev`: unverified claims appear on the page as **dashed orange "TODO" chips**
(they are hidden automatically in production builds).

## 1. Claims needing verification (`content/claims.json`)

Set `"verified": true` only when you can prove it. Until then they stay hidden.

| Claim id | Text | What's needed |
|---|---|---|
| `uptime-sla` | 99.9% uptime SLA | Only enable with a written SLA (with service credits) and real uptime monitoring. |
| `client-count` | 50+ clients | Count distinct paying clients. Use the exact number or a safe floor. |
| `projects-delivered` | 50+ projects delivered | Verify against invoices / project list. |
| `years-experience` | 5+ years of experience | Confirm founding year (company) or the basis (team experience). |
| `aws-certified` | AWS-certified engineers | List certification names + validation numbers. |
| `monitoring-24x7` | 24/7 monitoring & alerting | Alerts can be 24/7; confirm who *responds* outside business hours. |
| `remote-india` | Working remotely with clients across India | Confirm you've delivered for clients outside Pune. |

Already marked verified (from your brief): Pune location, AWS-native hosting, Mon–Fri 9–7 IST hours, INR pricing.

## 2. Testimonials (`content/testimonials.ts`)

- [ ] `testimonials` is **empty**, so the section is hidden.
- [ ] Three quotes from the old site are parked in `pendingReview` (Dr. Ramesh Iyer, Priya Sharma, Arjun Kapoor). They contain specific results (+40% bookings, 3× inquiries). For each: confirm the person is real, the quote and numbers are accurate, and you have **written consent**. Then move it to `testimonials`.

## 3. Case studies (`content/case-studies.ts`)

All three cards are placeholders with a visible **"Placeholder"** badge. For each:
- [ ] Client name (or "Confidential, [industry]") + permission
- [ ] Title, 1–2 sentence summary, services used
- [ ] Real, client-approved result (no invented metrics)
- [ ] Screenshot → `/public/work/<name>.webp`, set `image: "/work/<name>.webp"`
- [ ] Set `placeholder: false`
- If you have none ready yet, consider deleting all three entries (the section hides itself when the list is empty).

## 4. Business details (`content/site.ts`)

- [x] **Email:** set to `gatesachin1112@gmail.com` (owner request, 2026-11-01). `CONTACT_FROM_EMAIL` stays on the domain: SES can only send from an identity you verify, and Gmail addresses fail DMARC as a sender.
- [ ] **Social profiles:** add LinkedIn / GitHub URLs (empty = hidden).
- [ ] Old homepage CTA called `tel:+911234567890` (a placeholder). Fixed: the new site uses +91 78752 55254 everywhere.

## 5. Copy to confirm

- [ ] **Timelines** in `content/services.ts` and the FAQ (websites 2–4 weeks, web apps 6–12, AI pilot 3–6, etc.): are these realistic for you?
- [ ] **Pricing** (`content/pricing.ts`): Starter ₹7,999 and Business ₹18,999 are from the old site. Confirm they're current, and confirm "exclusive of GST". The old Premium "₹39,999+" is now **Enterprise / Custom**. The old "Priority 24/7 support" became "priority support with agreed response times" to match your Mon–Fri hours.
- [ ] **AI models** (`content/ai.ts` → `aiPage.models`): confirm which providers you actually use (AWS Bedrock, OpenAI, Anthropic, etc.).
- [ ] **Integrations list** (`content/ai.ts`): Zoho, HubSpot, Salesforce, Freshdesk, Zendesk are examples. Keep only ones you'd take on.
- [ ] **Data residency** statement ("can host in Indian AWS regions"): confirm you're comfortable committing to this.
- [ ] **About page team** (`content/about.ts` → `team`): add founder/team names, roles, photos. The section is hidden while empty.
- [ ] Hero H1 A/B options: see `content/copy-options.md`.

## 6. Legal (`content/legal.ts`)

- [ ] Privacy Policy, Terms and Cookie Policy are sensible **drafts**, not legal advice. Have a lawyer review them (DPDP Act 2023 compliance, grievance officer details if required).
- [ ] If you add analytics (e.g. Google Analytics), update the Cookie Policy and add a consent banner.

## 7. Images

- [ ] Open Graph image is generated automatically (`app/opengraph-image.tsx`). Optionally replace it with a designed 1200×630 image.
- [ ] Logo: the new mark is a simple placeholder (`components/layout/logo.tsx`, `app/icon.svg`). Swap in your official logo if you have one.
