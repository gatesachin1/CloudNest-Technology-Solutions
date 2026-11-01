import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "brand",
  as: H = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "brand" | "ai" | "dark";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", tone === "ai" && "eyebrow-ai", tone === "dark" && "border-white/15 bg-white/5 text-brand-200")}>
          {eyebrow}
        </p>
      )}
      <H
        className={cn(
          "mt-4 font-bold tracking-tight",
          H === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </H>
      {subtitle && (
        <p className={cn("mt-4 text-lg leading-relaxed", tone === "dark" ? "text-slate-300" : "text-muted")}>{subtitle}</p>
      )}
    </div>
  );
}
