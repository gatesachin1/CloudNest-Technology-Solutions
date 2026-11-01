import Link from "next/link";
import { faqs } from "@/content/faq";
import { sectionHeadings } from "@/content/home";
import { SectionHeader } from "@/components/layout/section-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd, faqSchema } from "@/components/seo/json-ld";

// FAQPage JSON-LD is emitted once, on the homepage; pass withSchema={false} elsewhere.
export function FAQ({ withSchema = true }: { withSchema?: boolean }) {
  const h = sectionHeadings.faq;
  return (
    <section id="faq" className="section">
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeader eyebrow={h.eyebrow} title={h.title} subtitle={h.subtitle} align="left" />
          <Link href="/contact/" className="mt-6 inline-block font-semibold text-brand-700 underline-offset-4 hover:underline">
            Ask us a question →
          </Link>
        </div>
        <Accordion type="single" collapsible className="rounded-lg border border-line bg-white px-6 shadow-card">
          {faqs.map((f, i) => (
            <AccordionItem key={f.question} value={`faq-${i}`}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent>{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
