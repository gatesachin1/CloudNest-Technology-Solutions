import type { IconName } from "@/components/ui/icon";

export const processSteps: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "message",
    title: "Consult",
    description: "A free call to understand your goals, users and constraints. You get a clear scope, timeline and fixed quote.",
  },
  {
    icon: "pen",
    title: "Design",
    description: "Wireframes, visual design and architecture, reviewed with you before a line of production code is written.",
  },
  {
    icon: "code",
    title: "Build & Integrate",
    description: "Weekly demos as we build, integrate AI and your tools, and test on real devices and real questions.",
  },
  {
    icon: "rocket",
    title: "Launch & Support",
    description: "Secure AWS deployment, monitoring and handover docs, then ongoing support and improvements.",
  },
];
