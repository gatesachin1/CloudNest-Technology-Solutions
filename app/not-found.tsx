import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">We couldn&apos;t find that page</h1>
      <p className="mt-4 max-w-md text-lg text-muted">It may have moved. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/services/">Our services</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/blog/">Blog</Link>
        </Button>
      </div>
    </section>
  );
}
