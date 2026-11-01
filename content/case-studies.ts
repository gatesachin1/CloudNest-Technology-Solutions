// Selected work. These are PLACEHOLDERS: replace with real projects
// (with client permission) and set `placeholder: false`.
// Cards with placeholder: true show a visible "Placeholder" badge.

export type CaseStudy = {
  id: string;
  placeholder: boolean;
  client: string;
  industry: string;
  title: string;
  summary: string;
  services: string[];
  result: string; // only real, client-approved outcomes
  image?: string; // e.g. "/work/project-1.webp" (place in /public/work). Current SVGs are illustrations: swap for real screenshots.
};

export const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    placeholder: true,
    client: "TODO: Client name",
    industry: "Healthcare",
    title: "Website and WhatsApp booking assistant for a clinic",
    summary: "TODO: 1–2 sentences on the problem and what we built.",
    services: ["Website", "WhatsApp bot", "AWS hosting"],
    image: "/work/clinic-booking.svg",
    result: "TODO: real, client-approved outcome",
  },
  {
    id: "case-2",
    placeholder: true,
    client: "TODO: Client name",
    industry: "Professional services",
    title: "Internal knowledge assistant on Microsoft Teams",
    summary: "TODO: 1–2 sentences on the problem and what we built.",
    services: ["RAG assistant", "Teams bot", "Integrations"],
    image: "/work/teams-knowledge-assistant.svg",
    result: "TODO: real, client-approved outcome",
  },
  {
    id: "case-3",
    placeholder: true,
    client: "TODO: Client name",
    industry: "E-commerce",
    title: "Store migration to AWS with CI/CD",
    summary: "TODO: 1–2 sentences on the problem and what we built.",
    services: ["E-commerce", "AWS migration", "CI/CD"],
    image: "/work/ecommerce-aws-migration.svg",
    result: "TODO: real, client-approved outcome",
  },
];
