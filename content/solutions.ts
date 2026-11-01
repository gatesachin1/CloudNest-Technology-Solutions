import type { IconName } from "@/components/ui/icon";

// "Solutions by customer type": homepage tabs.
export const solutions: {
  id: string;
  icon: IconName;
  label: string;
  headline: string;
  description: string;
  needs: string[];
  outcomes: string[];
}[] = [
  {
    id: "small-business",
    icon: "store",
    label: "Small Business",
    headline: "Look professional online and stop missing enquiries",
    description: "Clinics, restaurants, real estate, retail and professional services that need a dependable online presence.",
    needs: [
      "A fast, mobile-friendly website",
      "WhatsApp chatbot for FAQs and bookings",
      "Google visibility and reviews",
      "Hosting and updates handled for you",
    ],
    outcomes: [
      "Customers find answers any time of day",
      "Enquiries arrive in one place, not lost in DMs",
      "No more worrying about hosting or security",
    ],
  },
  {
    id: "startups",
    icon: "rocket",
    label: "Startups",
    headline: "Ship your MVP fast on foundations that scale",
    description: "Founders and product teams who need to launch quickly without creating tech debt they'll regret.",
    needs: [
      "MVP web app or SaaS product",
      "AI features inside your product",
      "CI/CD and cloud set up properly from day one",
      "Fractional DevOps support",
    ],
    outcomes: [
      "Launch sooner with a small, focused scope",
      "Infrastructure costs that stay predictable",
      "A codebase your future team can own",
    ],
  },
  {
    id: "enterprise",
    icon: "building",
    label: "Enterprise",
    headline: "Bring AI and automation to teams, securely",
    description: "Larger organisations modernising internal tools, knowledge and customer support.",
    needs: [
      "RAG assistants over internal documents",
      "Slack / Teams bots for HR, IT and sales",
      "Integrations with CRM, ERP and helpdesk",
      "Security reviews, access control and audit logs",
    ],
    outcomes: [
      "Faster answers for staff and customers",
      "Less repetitive manual work",
      "AI rolled out with governance, not shadow IT",
    ],
  },
];
