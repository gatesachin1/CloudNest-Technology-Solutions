// Global business details, SEO defaults and navigation.
// Edit text here — components read from this file.

export const site = {
  name: "Cloudnest Technology Solutions",
  shortName: "Cloudnest",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cloudnesttechnologysolutions.in").replace(/\/$/, ""),
  title: "Web Development, AI Chatbots & AWS Cloud in Pune | Cloudnest",
  description:
    "Cloudnest builds fast websites and web apps, AI chatbots and AI integrations, and runs them on secure AWS cloud infrastructure, for startups, small businesses and enterprises in Pune and across India.",
  keywords: [
    "web development Pune",
    "website development company India",
    "AI chatbot development",
    "WhatsApp chatbot",
    "RAG chatbot",
    "AI integration services",
    "workflow automation",
    "AWS cloud hosting India",
    "DevOps services Pune",
  ],
  phone: { display: "+91 78752 55254", e164: "+917875255254" },
  whatsapp: "917875255254",
  // TODO: create this mailbox (needed for SES too). Old site used a personal Gmail address.
  email: "gatesachin1112@gmail.com",
  address: {
    locality: "Pune",
    region: "Maharashtra",
    country: "India",
    countryCode: "IN",
  },
  hours: {
    display: "Mon–Fri, 9:00 AM – 7:00 PM IST",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "19:00",
  },
  // TODO: add real profile URLs (used in footer + Organization JSON-LD). Empty = hidden.
  social: {
    linkedin: "",
    github: "",
  },
} as const;

export const mainNav = [
  { label: "Services", href: "/services/" },
  { label: "AI Solutions", href: "/ai-solutions/" },
  { label: "Industries", href: "/#solutions" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const navCta = { label: "Free Consultation", href: "/contact/" } as const;

export const footerNav = {
  services: [
    { label: "Websites & Web Apps", href: "/services/#websites" },
    { label: "AI Chatbots & Assistants", href: "/services/#ai-chatbots" },
    { label: "AI Integrations & Automation", href: "/services/#ai-integrations" },
    { label: "Cloud Hosting & DevOps", href: "/services/#cloud-devops" },
    { label: "Maintenance & Support", href: "/services/#support" },
  ],
  company: [
    { label: "About", href: "/about/" },
    { label: "AI Solutions", href: "/ai-solutions/" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog/" },
    { label: "Contact", href: "/contact/" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy/" },
    { label: "Terms of Service", href: "/terms/" },
    { label: "Cookie Policy", href: "/cookies/" },
  ],
} as const;
