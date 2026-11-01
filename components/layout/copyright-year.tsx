"use client";

import { useSyncExternalStore } from "react";

// Static export bakes the build year into the HTML; this re-reads it in the browser
// so the footer stays correct even if the site isn't rebuilt in a new year.
const subscribe = () => () => {};
const buildYear = new Date().getFullYear();

export function CopyrightYear() {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => buildYear);
  return <>{year}</>;
}
