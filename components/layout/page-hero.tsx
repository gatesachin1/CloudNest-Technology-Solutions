import { SectionHeader } from "./section-header";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = "brand",
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "brand" | "ai";
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,#000_30%,transparent_100%)]" />
      <div
        className={
          tone === "ai"
            ? "absolute -top-40 left-1/2 -z-10 h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.14),transparent)]"
            : "absolute -top-40 left-1/2 -z-10 h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.12),transparent)]"
        }
      />
      <div className="container-page py-16 sm:py-24">
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} subtitle={subtitle} tone={tone} />
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
