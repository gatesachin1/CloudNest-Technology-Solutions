import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactDetails } from "@/components/sections/cta-band";
import { FAQ } from "@/components/sections/faq";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact: Book a Free Consultation",
  description:
    "Talk to Cloudnest about a website, web app, AI chatbot, AI integration or AWS cloud project. Based in Pune, working with businesses across India. Free consultation.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }])} />
      <PageHero
        eyebrow="Contact"
        title="Book a free consultation"
        subtitle="Tell us what you're planning. We'll reply within one business day with next steps."
      />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 mb-8 text-muted">All fields except those marked optional are required.</p>
            <ContactForm idPrefix="contact" />
          </div>
          <aside className="space-y-8">
            <div>
              <h2 className="text-xl font-bold">Reach us directly</h2>
              <ContactDetails dark={false} className="mt-5" />
            </div>
            <div className="rounded-lg bg-surface-2 p-6 ring-1 ring-line">
              <h2 className="flex items-center gap-2 text-base font-bold">
                <MapPin className="size-4 text-brand-600" aria-hidden="true" /> Location
              </h2>
              <p className="mt-2 text-muted">
                {site.address.locality}, {site.address.region}, {site.address.country}. We work with clients remotely
                over video calls, email and WhatsApp.
              </p>
            </div>
            <div className="rounded-lg bg-brand-50/60 p-6 ring-1 ring-brand-100">
              <h2 className="text-base font-bold">What happens next?</h2>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-muted marker:font-semibold marker:text-brand-600">
                <li>We reply within one business day.</li>
                <li>A free 30-minute call to understand your goals.</li>
                <li>A clear proposal with scope, timeline and price.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
      <FAQ withSchema={false} />
    </>
  );
}
