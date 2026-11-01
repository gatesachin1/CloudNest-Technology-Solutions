import type { IconName } from "@/components/ui/icon";

export const about = {
  hero: {
    eyebrow: "About Cloudnest",
    title: "A technology partner that builds it, runs it and stays",
    subtitle:
      "We're a Pune-based team building websites, AI assistants and automations on reliable AWS infrastructure, for businesses of every size.",
  },
  story: {
    title: "Why we started",
    paragraphs: [
      "Cloudnest Technology Solutions was founded on one observation: businesses were spending lakhs on websites and software, but what sat underneath was fragile. Shared hosting that went down at peak traffic, no monitoring, no backups and no path to scale.",
      "We set out to change that by combining cloud-native AWS architecture with proper DevOps practices, giving growing businesses the kind of reliability large enterprises take for granted.",
      "Today, that same foundation powers what our clients ask for most: fast websites, web apps, and AI assistants and automations that save their teams real time. Every system we build is automated, version-controlled and documented, so there are no surprises at 2 AM.",
      "Our approach is simple: treat every client's systems like our own. We over-communicate, automate relentlessly and never ship something we wouldn't be comfortable supporting.",
    ],
  },
  // TODO: add founder / team profiles (name, role, photo, LinkedIn) — see CONTENT_TODO.md
  team: [] as { name: string; role: string; bio: string; image?: string }[],
  values: [
    { icon: "shield", title: "Security by default", description: "Encryption, least-privilege access and automated patching are built in from the start, never bolted on." },
    { icon: "eye", title: "Full transparency", description: "You always know what we're building and why. We document everything, share access and avoid lock-in." },
    { icon: "workflow", title: "Automate the repetitive", description: "Deployments, backups, tests and monitoring are automated so systems improve over time instead of decaying." },
    { icon: "trending", title: "Build to scale", description: "Designed for many times today's traffic, so growth is exciting, not a reason to panic." },
    { icon: "handshake", title: "Partners, not vendors", description: "Your goals are our goals, and we stay engaged long after launch." },
    { icon: "sparkles", title: "Responsible AI", description: "We're honest about what AI can and can't do, keep humans in the loop and protect your data." },
  ] as { icon: IconName; title: string; description: string }[],
  expertise: [
    { title: "Web & product engineering", items: "Next.js, React, TypeScript, Node.js, headless CMS, e-commerce" },
    { title: "AI & automation", items: "Chatbots, RAG assistants, LLM integrations, document processing, workflow automation" },
    { title: "AWS cloud", items: "S3, CloudFront, EC2, RDS, Lambda, VPC, IAM, Bedrock" },
    { title: "DevOps & reliability", items: "CI/CD, Terraform, monitoring, observability, incident response" },
  ],
};
