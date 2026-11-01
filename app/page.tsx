import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AISpotlight } from "@/components/sections/ai-spotlight";
import { SolutionsTabs } from "@/components/sections/solutions-tabs";
import { Process } from "@/components/sections/process";
import { CaseStudies } from "@/components/sections/case-studies";
import { WhyUs } from "@/components/sections/why-us";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd, serviceSchemas } from "@/components/seo/json-ld";
import { services } from "@/content/services";

export default function HomePage() {
  return (
    <>
      <JsonLd data={serviceSchemas(services)} />
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <AISpotlight />
      <SolutionsTabs />
      <Process />
      <CaseStudies />
      <WhyUs />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTABand />
    </>
  );
}
