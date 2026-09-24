import { pageMetadata } from "@/lib/seo";
import { PartnershipSection } from "@/components/PartnershipSection";

export const metadata = pageMetadata(
  "Partnerships | Soil Index",
  "Collaboration, review partner, data contributor, and governance pathways for the Global Soil Index.",
  "/partnerships"
);

export default function PartnershipsPage() {
  return (
    <main className="gsi-animate-page mx-auto min-h-[calc(100vh-96px)] max-w-[1400px] px-5 py-8 sm:px-8 lg:px-[34px] lg:py-10">
      <header className="border-b border-white/10 pb-8">
        <p className="gsi-kicker">Partnerships</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
          Collaboration and review partners.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/48">
          A dedicated place for confirmed organizations, reviewers, data
          contributors, and public-interest collaborators as the index grows.
        </p>
      </header>

      <PartnershipSection />
    </main>
  );
}
