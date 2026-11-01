import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { hero } from "@/content/home";
import { Button } from "@/components/ui/button";
import { HeroMockup } from "@/components/mockups/hero-mockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.12),transparent)]" />

      <div className="container-page grid items-center gap-16 pt-14 pb-24 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-24 lg:pb-32">
        <div className="max-w-xl">
          <p className="eyebrow">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          {/* Not animated: the H1 is the LCP element and must paint immediately. */}
          <h1 className="mt-5 text-display font-extrabold">
            {(() => {
              const [a, b, ...rest] = hero.title.split(". ");
              return rest.length ? (
                <>
                  {a}. {b}.{" "}
                  {/* non-breaking hyphen keeps "Enterprise-Grade" together */}
                  <span className="text-gradient">{rest.join(". ").replace(/-/g, "‑")}</span>
                </>
              ) : (
                hero.title
              );
            })()}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{hero.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label} <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}
