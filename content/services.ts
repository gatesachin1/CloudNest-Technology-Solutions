import type { IconName } from "@/components/ui/icon";

export type Service = {
  id: string; // anchor on /services
  icon: IconName;
  title: string;
  summary: string; // homepage card
  points: string[]; // homepage card bullets
  // /services detail section
  intro: string;
  deliverables: string[];
  goodFor: string[];
  timeline: string; // TODO: confirm typical timelines
  accent?: "ai";
};

export const services: Service[] = [
  {
    id: "websites",
    icon: "globe",
    title: "Business Websites",
    summary: "Fast, mobile-first marketing sites that load quickly, rank well and turn visitors into enquiries.",
    points: ["Custom design, no templates", "SEO & analytics setup", "Easy content editing"],
    intro:
      "Your website is often the first conversation a customer has with you. We design and build sites that are fast on any phone, clear about what you do, and easy for your team to update.",
    deliverables: [
      "UX and visual design tailored to your brand",
      "Responsive build, optimised for Core Web Vitals",
      "On-page SEO, sitemap, structured data and analytics",
      "Contact forms, WhatsApp click-to-chat and booking links",
      "Optional CMS or blog so your team can publish",
    ],
    goodFor: ["Clinics & local services", "Professional firms", "Restaurants & retail", "Real estate"],
    timeline: "Typically 2–4 weeks",
  },
  {
    id: "web-apps",
    icon: "layout",
    title: "Web Apps, Portals & E-commerce",
    summary: "Customer portals, dashboards, booking systems and online stores built to scale with your business.",
    points: ["Customer & partner portals", "E-commerce with payments", "Custom internal tools"],
    intro:
      "When a website isn't enough, we build web applications: secure portals, online stores and internal tools that fit how your business actually works.",
    deliverables: [
      "Product discovery and clickable prototypes",
      "Secure authentication and role-based access",
      "E-commerce with Indian payment gateways",
      "Admin dashboards and reporting",
      "API design and third-party integrations",
    ],
    goodFor: ["Startups building an MVP", "Businesses selling online", "Teams replacing spreadsheets"],
    timeline: "Typically 6–12 weeks, scoped per project",
  },
  {
    id: "ai-chatbots",
    icon: "bot",
    title: "AI Chatbots & Assistants",
    summary: "Website, WhatsApp, Slack and Teams assistants that answer questions from your own documents.",
    points: ["Website & WhatsApp bots", "Slack / Teams assistants", "Answers from your documents (RAG)"],
    intro:
      "We build AI assistants that answer customer and staff questions using your own content (policies, product catalogues, manuals, FAQs), and hand off to a human when they should.",
    deliverables: [
      "Website chat widget and WhatsApp Business bot",
      "Slack and Microsoft Teams assistants for internal teams",
      "Retrieval-augmented generation (RAG) over your documents",
      "Guardrails, source citations and human hand-off",
      "Conversation logs and review dashboard",
    ],
    goodFor: ["Customer support", "Sales enquiries", "HR & internal knowledge", "Appointment booking"],
    timeline: "Pilot typically in 3–6 weeks",
    accent: "ai",
  },
  {
    id: "ai-integrations",
    icon: "workflow",
    title: "AI Integrations & Automation",
    summary: "Connect AI to your CRM, helpdesk, payments and internal tools to remove repetitive manual work.",
    points: ["CRM & helpdesk integrations", "Document processing", "Workflow automation"],
    intro:
      "Most of the value of AI comes from wiring it into the tools you already use. We automate repetitive work (data entry, triage, document handling) with clear review steps for your team.",
    deliverables: [
      "CRM, helpdesk and payment integrations",
      "Document and invoice extraction into your systems",
      "Lead qualification and ticket triage",
      "Scheduled reports and summaries",
      "Custom APIs and webhooks between your tools",
    ],
    goodFor: ["Operations teams", "Sales & support", "Finance & back office"],
    timeline: "Typically 2–8 weeks per workflow",
    accent: "ai",
  },
  {
    id: "cloud-devops",
    icon: "cloud",
    title: "Cloud Hosting & DevOps on AWS",
    summary: "Secure AWS hosting, CI/CD pipelines, monitoring and migrations: the reliable backbone behind it all.",
    points: ["AWS hosting & CDN", "CI/CD & Infrastructure as Code", "Migrations to AWS"],
    intro:
      "Everything we build runs on infrastructure we'd be comfortable supporting at midnight: automated, version-controlled and documented, using the same AWS practices large enterprises rely on.",
    deliverables: [
      "AWS architecture: S3, CloudFront, EC2, RDS, Lambda",
      "CI/CD pipelines with automated tests and rollbacks",
      "Infrastructure as Code with Terraform",
      "Monitoring, logging and alerting",
      "Migrations from shared hosting or other clouds",
    ],
    goodFor: ["Growing traffic", "Teams deploying by hand", "Compliance-minded businesses"],
    timeline: "Typically 1–4 weeks",
  },
  {
    id: "support",
    icon: "lifebuoy",
    title: "Maintenance, Monitoring & Support",
    summary: "Updates, backups, security patches and fixes, so your site and systems stay healthy after launch.",
    points: ["Security updates & backups", "Uptime monitoring", "AI-assisted, human-led support"],
    intro:
      "We don't deliver and disappear. Our support plans keep your website, apps and AI assistants secure, up to date and improving over time.",
    deliverables: [
      "Security patches and dependency updates",
      "Automated backups and restore testing",
      "Uptime and error monitoring with alerts",
      "Content updates and small enhancements",
      "Monthly health report",
    ],
    goodFor: ["Any site we build", "Existing sites needing a reliable owner"],
    timeline: "Monthly plans",
  },
];
