import { cookies } from "@/content/legal";
import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: cookies.title, description: cookies.description, path: "/cookies/" });

export default function CookiesPage() {
  return <LegalPage doc={cookies} path="/cookies/" />;
}
