import { terms } from "@/content/legal";
import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: terms.title, description: terms.description, path: "/terms/" });

export default function TermsPage() {
  return <LegalPage doc={terms} path="/terms/" />;
}
