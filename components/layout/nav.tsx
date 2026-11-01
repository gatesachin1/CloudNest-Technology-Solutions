"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { Menu, X, Phone } from "lucide-react";
import { mainNav, navCta, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => !href.includes("#") && href !== "/" && pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-line bg-white/85 shadow-[0_1px_12px_rgb(15_23_42/0.06)] backdrop-blur-lg"
          : "border-transparent bg-white/60 backdrop-blur",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow-card"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="rounded-full px-3 py-2 text-[0.92rem] font-medium text-muted transition-colors hover:text-ink aria-[current=page]:text-brand-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <Link href={navCta.href}>{navCta.label}</Link>
          </Button>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-ink hover:bg-surface-3 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,360px)] flex-col bg-white p-6 shadow-float lg:hidden">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-lg font-bold">Menu</Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-full hover:bg-surface-3"
                    aria-label="Close menu"
                  >
                    <X className="size-6" aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
              <ul className="mt-6 flex flex-col">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 text-lg font-medium text-ink hover:bg-surface-2"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href={navCta.href} onClick={() => setOpen(false)}>
                    {navCta.label}
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full" size="lg">
                  <a href={`tel:${site.phone.e164}`}>
                    <Phone /> {site.phone.display}
                  </a>
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </nav>
    </header>
  );
}
