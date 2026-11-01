"use client";

import { Tabs as T } from "radix-ui";
import { cn } from "@/lib/utils";

export const Tabs = T.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof T.List>) {
  return (
    <T.List
      className={cn("inline-flex flex-wrap justify-center gap-1 rounded-full border border-line bg-surface-2 p-1", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof T.Trigger>) {
  return (
    <T.Trigger
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted transition-all hover:text-ink data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-card sm:px-5",
        className,
      )}
      {...props}
    />
  );
}

export const TabsContent = T.Content;
