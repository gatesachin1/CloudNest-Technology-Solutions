import { CircleCheck } from "lucide-react";
import { isDev, unverifiedClaims, verifiedClaims } from "@/lib/claims";

// Only claims marked verified in content/claims.json render here.
// In `npm run dev`, unverified claims appear as dashed TODO chips so you can review them.
const ids = [
  "location",
  "aws-native",
  "support-hours",
  "inr-pricing",
  "remote-india",
  "client-count",
  "projects-delivered",
  "years-experience",
  "uptime-sla",
];

export function TrustStrip() {
  const shown = verifiedClaims(ids);
  const todo = isDev ? unverifiedClaims(ids) : [];
  if (!shown.length && !todo.length) return null;

  return (
    <section aria-label="At a glance" className="border-y border-line bg-surface-2">
      <ul className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 text-sm font-medium text-ink-2">
        {shown.map((c) => (
          <li key={c.id} className="flex items-center gap-2">
            <CircleCheck className="size-4 text-brand-600" aria-hidden="true" />
            {c.text}
          </li>
        ))}
        {todo.map((c) => (
          <li
            key={c.id}
            title={c.source}
            className="rounded-full border border-dashed border-warn/60 bg-warn-50 px-3 py-1 text-xs text-warn"
          >
            TODO (hidden in prod): {c.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
