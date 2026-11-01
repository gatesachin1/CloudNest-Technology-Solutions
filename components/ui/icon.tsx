import {
  Bot, Building2, Cloud, CodeXml, Eye, FileSearch, Globe, Handshake, Headset, LayoutDashboard,
  LifeBuoy, Lock, MessageSquare, PenTool, Rocket, Shield, Sparkles, Store, TrendingUp,
  TriangleAlert, UserCheck, Users, Workflow, type LucideProps,
} from "lucide-react";

// Maps content-file icon names to lucide icons, so /content stays plain data.
const icons = {
  bot: Bot,
  building: Building2,
  cloud: Cloud,
  code: CodeXml,
  eye: Eye,
  "file-search": FileSearch,
  globe: Globe,
  handshake: Handshake,
  headset: Headset,
  layout: LayoutDashboard,
  lifebuoy: LifeBuoy,
  lock: Lock,
  message: MessageSquare,
  pen: PenTool,
  rocket: Rocket,
  shield: Shield,
  sparkles: Sparkles,
  store: Store,
  trending: TrendingUp,
  alert: TriangleAlert,
  "user-check": UserCheck,
  users: Users,
  workflow: Workflow,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" {...props} />;
}
