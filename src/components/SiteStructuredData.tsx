import { SITE_URL } from "@/lib/seo";

export function SiteStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Soil Index",
        url: `${SITE_URL}/`,
        description: "A soil health initiative developing the Global Soil Index.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Soil Index",
        url: `${SITE_URL}/`,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
