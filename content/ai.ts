import type { IconName } from "@/components/ui/icon";

// What we build: shown on the homepage AI spotlight and /ai-solutions.
export const aiCapabilities: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "message",
    title: "Website & WhatsApp chatbots",
    description: "Answer common questions, capture leads and book appointments around the clock, then hand off to your team.",
  },
  {
    icon: "file-search",
    title: "Assistants over your documents",
    description:
      "Retrieval-augmented (RAG) assistants that answer from your policies, manuals and catalogues and show the sources they used.",
  },
  {
    icon: "users",
    title: "Slack & Microsoft Teams bots",
    description: "Give staff instant answers on HR policies, IT how-tos and product specs, right where they already work.",
  },
  {
    icon: "workflow",
    title: "Automations & integrations",
    description: "Connect AI to your CRM, helpdesk and back office to triage tickets, extract documents and draft replies.",
  },
];

// Scripted conversation for the interactive demo widget. No live API calls.
export type ChatTurn = { role: "user" | "assistant"; text: string; source?: string };

export const chatDemo: {
  title: string;
  subtitle: string;
  disclaimer: string;
  scenarios: { id: string; label: string; turns: ChatTurn[] }[];
} = {
  title: "Cloudnest Assistant",
  subtitle: "Demo · scripted conversation",
  disclaimer: "This is a scripted demo. Real assistants are configured on your content and reviewed by your team.",
  scenarios: [
    {
      id: "clinic",
      label: "Clinic front desk",
      turns: [
        { role: "user", text: "Hi! Are you open on Saturday?" },
        {
          role: "assistant",
          text: "Yes, the clinic is open Saturdays from 9 AM to 1 PM. Would you like me to check available appointment slots?",
          source: "Clinic timings.pdf",
        },
        { role: "user", text: "Yes please, something around 11." },
        {
          role: "assistant",
          text: "I can request 11:00 AM with Dr. Mehta. I'll pass this to the front desk, and they'll confirm on WhatsApp shortly.",
        },
      ],
    },
    {
      id: "hr",
      label: "HR policy bot (Slack)",
      turns: [
        { role: "user", text: "How many casual leaves do I get per year?" },
        {
          role: "assistant",
          text: "According to the Leave Policy, full-time employees get 12 casual leaves per calendar year, credited monthly.",
          source: "Leave Policy v3, section 2.1",
        },
        { role: "user", text: "Can I carry them forward?" },
        {
          role: "assistant",
          text: "The policy says casual leave can't be carried forward. For exceptions, I can open a request with HR for you.",
          source: "Leave Policy v3, section 2.4",
        },
      ],
    },
    {
      id: "store",
      label: "E-commerce support",
      turns: [
        { role: "user", text: "Where is my order #10482?" },
        {
          role: "assistant",
          text: "Order #10482 shipped yesterday and is expected to arrive in 2–3 days. Here's your tracking link.",
          source: "Order system",
        },
        { role: "user", text: "I want to return one item." },
        {
          role: "assistant",
          text: "Sure. Items can be returned within 7 days of delivery. I've started a return request; our team will review it and email you a pickup slot.",
          source: "Returns policy",
        },
      ],
    },
  ],
};

// /ai-solutions page content
export const aiPage = {
  hero: {
    eyebrow: "AI Solutions",
    title: "Practical AI for real business work",
    subtitle:
      "Chatbots, document assistants and automations, built around your data and your tools, with humans in the loop where it matters.",
  },
  ragSteps: [
    { title: "Connect your content", description: "PDFs, docs, help-centre articles, spreadsheets or a database: we index the sources you choose." },
    { title: "Retrieve the right passages", description: "For each question, the assistant searches your content for the most relevant passages." },
    { title: "Answer with sources", description: "The AI answers using only those passages and shows where the answer came from." },
    { title: "Review & improve", description: "Your team reviews conversations, flags gaps and we tune the assistant over time." },
  ],
  channels: ["Website chat", "WhatsApp Business", "Slack", "Microsoft Teams", "Email", "Internal web apps"],
  integrations: ["CRMs (e.g. Zoho, HubSpot, Salesforce)", "Helpdesks (e.g. Freshdesk, Zendesk)", "Payment gateways", "Google Workspace & Microsoft 365", "Custom databases & APIs"],
  // TODO: confirm the providers you actually work with before launch.
  models:
    "We pick models per project for quality, cost and data-residency needs, such as models available through AWS Bedrock or other leading providers.",
  responsibleAi: [
    {
      icon: "shield" as IconName,
      title: "Your data stays yours",
      description:
        "We use providers and settings that don't train on your data, keep credentials in your cloud account, and can host in Indian AWS regions where needed.",
    },
    {
      icon: "user-check" as IconName,
      title: "Human review built in",
      description: "Assistants hand off to people for sensitive or uncertain cases, and your team can review conversations.",
    },
    {
      icon: "alert" as IconName,
      title: "Honest about limits",
      description:
        "AI can make mistakes. We don't promise perfect accuracy; we design guardrails, show sources and test against real questions before launch.",
    },
    {
      icon: "lock" as IconName,
      title: "Security & access control",
      description: "Role-based access, encryption in transit and at rest, audit logs, and content restricted to what each user is allowed to see.",
    },
  ],
};
