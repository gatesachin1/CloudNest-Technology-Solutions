import { cn } from "@/lib/utils";

/**
 * Subtle fade-up when the element scrolls into view.
 * Server component: CSS does the animation and <RevealObserver /> (one tiny client
 * script for the whole site) toggles `.is-visible`. No animation library on the
 * critical path, and content stays visible without JS (see globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Cmp = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Cmp data-reveal className={cn(className)} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </Cmp>
  );
}
