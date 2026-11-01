// Legal pages. These are sensible starting drafts, NOT legal advice.
// TODO: have a lawyer review all three before launch (see CONTENT_TODO.md).

export type LegalDoc = {
  title: string;
  description: string;
  updated: string; // ISO date
  intro: string;
  sections: { heading: string; body: string[] }[];
};

const company = "Cloudnest Technology Solutions";
const contactLine =
  "Email gatesachin1112@gmail.com or call +91 78752 55254 (Mon–Fri, 9:00 AM – 7:00 PM IST).";

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  description: `How ${company} collects, uses and protects personal data.`,
  updated: "2026-11-01",
  intro: `This policy explains what personal data ${company} ("we", "us") collects through this website and when you work with us, why we collect it, and the choices you have. We process personal data in line with India's Digital Personal Data Protection Act, 2023.`,
  sections: [
    {
      heading: "Information we collect",
      body: [
        "Contact form: your name, email, phone number (optional), company (optional), the service you're interested in and your message.",
        "Technical data: to protect the contact form from abuse we process your IP address. It is stored only as a salted one-way hash, for rate limiting, and deleted automatically (typically within 48 hours).",
        "Communications: emails, WhatsApp messages and call notes when you contact us directly.",
        "Client project data: when we build or operate systems for you, we process data under a separate written agreement.",
      ],
    },
    {
      heading: "How we use it",
      body: [
        "To reply to your enquiry and provide quotes and services.",
        "To keep our website and systems secure and prevent spam.",
        "To meet legal, tax and accounting obligations.",
        "We do not sell your personal data and we do not use it for third-party advertising.",
      ],
    },
    {
      heading: "AI services",
      body: [
        "When we build AI assistants for clients, we choose providers and settings that do not use client data to train public models, and we restrict access to authorised people. Details for each project are set out in the client agreement.",
      ],
    },
    {
      heading: "Where data is stored",
      body: [
        "Our website and contact form run on Amazon Web Services (AWS). Contact form messages are delivered by email using Amazon SES. Where possible we use the AWS Asia Pacific (Mumbai) region.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Enquiries are kept for up to 24 months unless they become a client relationship, in which case records are kept for as long as the law requires. Rate-limiting data is deleted automatically, typically within 48 hours.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask to access, correct or delete your personal data, withdraw consent, or raise a grievance. " + contactLine,
        "If you're not satisfied with our response, you may approach the Data Protection Board of India.",
      ],
    },
    {
      heading: "Changes",
      body: ["We may update this policy. The date at the top shows the latest version."],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of Service",
  description: `Terms for using the ${company} website and services.`,
  updated: "2026-11-01",
  intro: `These terms govern your use of this website. Services we deliver to clients are governed by a separate proposal or agreement, which takes precedence over these terms.`,
  sections: [
    {
      heading: "Use of this website",
      body: [
        "You may use this website for lawful purposes only. Don't attempt to disrupt it, gain unauthorised access, or submit spam through our forms.",
      ],
    },
    {
      heading: "Information on this site",
      body: [
        "We aim to keep information accurate and up to date, but content is provided for general information and may change without notice. Prices shown are indicative, exclude GST unless stated, and are confirmed in a written quote.",
        "Blog articles are educational and are not professional advice for your specific situation.",
      ],
    },
    {
      heading: "AI demonstrations",
      body: [
        "The chat demo on this website is scripted and illustrative. It does not represent guaranteed performance of any AI system. AI outputs can be inaccurate, and production assistants include human review where appropriate.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        `The design, text and graphics on this website belong to ${company} unless otherwise stated. Ownership of work delivered to clients is set out in each client agreement.`,
      ],
    },
    {
      heading: "Liability",
      body: [
        "To the extent permitted by law, we are not liable for any indirect or consequential loss arising from use of this website.",
      ],
    },
    {
      heading: "Governing law",
      body: ["These terms are governed by the laws of India, and courts in Pune, Maharashtra have jurisdiction."],
    },
    { heading: "Contact", body: [contactLine] },
  ],
};

export const cookies: LegalDoc = {
  title: "Cookie Policy",
  description: `How the ${company} website uses cookies and similar technologies.`,
  updated: "2026-11-01",
  intro:
    "This website is built to work without tracking cookies. This page explains what is stored in your browser and why.",
  sections: [
    {
      heading: "Cookies we use",
      body: [
        "Strictly necessary: none are currently required. The site is served as static pages.",
        "Analytics: none by default. If we add analytics in future (for example Google Analytics), we will update this page and ask for your consent where required before setting non-essential cookies.",
      ],
    },
    {
      heading: "Local storage",
      body: [
        "We don't store personal data in your browser. Your browser may cache pages and images to load the site faster.",
      ],
    },
    {
      heading: "Third-party links",
      body: [
        "Links to WhatsApp, email or other sites are governed by those services' own cookie and privacy policies.",
      ],
    },
    {
      heading: "Managing cookies",
      body: ["You can block or delete cookies in your browser settings at any time. " + contactLine],
    },
  ],
};
