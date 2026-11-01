import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <defs>
        <linearGradient id="cn-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#cn-g)" />
      <path
        d="M10.5 21.5h11a4 4 0 0 0 .6-7.96A5.5 5.5 0 0 0 11.6 12.7 4.4 4.4 0 0 0 10.5 21.5Z"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <LogoMark />
      <span className={cn("font-display text-lg leading-none font-bold tracking-tight", light ? "text-white" : "text-ink")}>
        Cloudnest{" "}
        <span className={cn("mt-1 block text-[0.62rem] font-semibold tracking-[0.14em] uppercase", light ? "text-slate-400" : "text-subtle")}>
          Technology Solutions
        </span>
      </span>
    </Link>
  );
}
