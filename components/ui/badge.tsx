import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.ComponentProps<"span"> & { tone?: "neutral" | "brand" | "ai" | "warn" }) {
  const tones = {
    neutral: "bg-surface-3 text-ink-2",
    brand: "bg-brand-50 text-brand-700",
    ai: "bg-ai-50 text-ai-700",
    warn: "bg-warn-50 text-warn ring-1 ring-warn/30",
  };
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", tones[tone], className)}
      {...props}
    />
  );
}
