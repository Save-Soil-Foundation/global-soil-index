import { pageMetadata } from "@/lib/seo";
import { PageEarthStrip } from "@/components/PageEarthStrip";
import { PartnershipPulse } from "@/components/PartnershipPulse";
import { PartnershipSection } from "@/components/PartnershipSection";

export const metadata = pageMetadata(
  "Partnerships | Soil Index",
  "Collaboration, review partner, data contributor, and governance pathways for the Global Soil Index.",
  "/partnerships"
);

export default function PartnershipsPage() {
  return (
    <main className="gsi-animate-page min-h-[calc(100vh-96px)] px-5 pb-8 pt-5 sm:px-8 lg:px-[34px] lg:pt-6">
      <PageEarthStrip
        eyebrow="Partnerships"
        title="Collaboration and review partners."
        description="A dedicated place for confirmed organizations, reviewers, data contributors, and public-interest collaborators as the index grows."
        panelLabel="Collaboration network"
        panelItems={[["Scientific", "Review"], ["Data", "Pipelines"], ["Civil", "Society"], ["Public", "Agencies"]]}
        panel={<PartnershipPulse />}
      />

      <PartnershipSection />
    </main>
  );
}
