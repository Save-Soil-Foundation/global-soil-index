import { pageMetadata } from "@/lib/seo";
import { PageEarthStrip } from "@/components/PageEarthStrip";
import { BlogSection } from "@/components/BlogSection";

export const metadata = pageMetadata(
  "Blog | Soil Index",
  "Soil health explainers, methodology notes, data-quality articles, and Global Soil Index updates.",
  "/blog"
);

export default function BlogPage() {
  return (
    <main className="gsi-animate-page min-h-[calc(100vh-96px)] px-5 pb-8 pt-5 sm:px-8 lg:px-[34px] lg:pt-6">
      <PageEarthStrip
        eyebrow="Blog"
        title="Soil health explainers and index updates."
        description="Methodology notes, data-quality explainers, map stories, and editorial updates for people following the Soil Index."
        panelLabel="Editorial focus"
        panelItems={[["Methods", "Notes"], ["Data", "Quality"], ["Map", "Stories"], ["Index", "Updates"]]}
      />

      <BlogSection />
    </main>
  );
}
