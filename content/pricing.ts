// Pricing. Edit prices here; `priceINR: null` shows "Custom".
// Starter and Business prices carried over from the previous site.

export type PricingTier = {
  id: string;
  name: string;
  priceINR: number | null;
  priceSuffix?: string;
  description: string;
  features: string[];
  excluded?: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    priceINR: 7999,
    priceSuffix: "one-time",
    description: "For small businesses getting a professional website online for the first time.",
    features: [
      "Up to 5 custom pages",
      "Mobile-responsive design",
      "Contact form & WhatsApp button",
      "Basic SEO setup",
      "SSL certificate included",
      "1 month free support",
    ],
    excluded: ["E-commerce", "AWS cloud hosting"],
    cta: { label: "Get started", href: "/contact/?plan=starter" },
  },
  {
    id: "business",
    name: "Business",
    priceINR: 18999,
    priceSuffix: "one-time",
    description: "For growing businesses that need a stronger presence backed by cloud infrastructure.",
    features: [
      "Up to 12 custom pages",
      "Premium UI/UX design",
      "AWS cloud hosting (1 year)",
      "Advanced SEO & Google Analytics",
      "Blog / CMS integration",
      "Performance monitoring",
      "3 months free support",
    ],
    cta: { label: "Get started", href: "/contact/?plan=business" },
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise / Custom",
    priceINR: null,
    description: "Web apps, e-commerce, dedicated AWS environments and AI programmes, scoped to your needs.",
    features: [
      "Custom web apps, portals & e-commerce",
      "Dedicated AWS environment",
      "Payment gateway & API integrations",
      "Security review & access controls",
      "Priority support with agreed response times",
      "Monthly strategy calls",
    ],
    cta: { label: "Talk to us", href: "/contact/?plan=enterprise" },
  },
];

export const aiAddOns: { name: string; description: string; price: string }[] = [
  { name: "AI chatbot setup", description: "Website or WhatsApp assistant trained on your FAQs and documents.", price: "Contact for quote" },
  { name: "AI integrations", description: "Connect AI to your CRM, helpdesk, payments or internal tools.", price: "Contact for quote" },
  { name: "Workflow automation", description: "Automate document handling, triage, reports and data entry.", price: "Contact for quote" },
];

export const pricingNote =
  "Prices are one-time development fees in INR, exclusive of GST. Hosting renewals are billed separately after year one. AI usage costs (model/API fees) are billed at cost or on your own account.";
