import type { IconName } from "@/components/ui/icon";

export const whyUs: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "cloud",
    title: "AWS-native",
    description:
      "Built on AWS from the ground up, not retrofitted. Global CDN delivery, automated deployments and infrastructure defined as code.",
  },
  {
    icon: "shield",
    title: "Security at every layer",
    description:
      "HTTPS everywhere, least-privilege access, encrypted data, automated backups and dependency patching, applied by default rather than as an upsell.",
  },
  {
    icon: "trending",
    title: "Built to scale",
    description:
      "Whether you get 10 visitors or 10,000 overnight, the architecture is designed to absorb spikes without a rebuild.",
  },
  {
    icon: "headset",
    title: "AI-assisted, human-led support",
    description:
      "We use AI to work faster, but real people own your project. Reach us by phone, email or WhatsApp during business hours.",
  },
];
