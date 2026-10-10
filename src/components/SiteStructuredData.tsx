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
        alternateName: "Global Soil Index",
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/#rankings`,
        url: `${SITE_URL}/`,
        name: "Soil Index | Global Soil Health Rankings & Country Profiles",
        description: "A soil-health platform in development with demonstration rankings and country profiles. Scores are not verified scientific measurements.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@type": "Thing", name: "Soil health" },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
