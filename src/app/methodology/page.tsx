import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageEarthStrip } from "@/components/PageEarthStrip";
import { MethodologyPulse } from "@/components/MethodologyPulse";
import { MethodologyIndicatorGrid } from "@/components/MethodologyIndicatorGrid";
import { getSoilDataProvider } from "@/lib/soil-data";

export const metadata = pageMetadata(
  "Soil Index Methodology | Indicators, Sources & Limitations",
  "Understand the proposed Soil Index indicators, evidence requirements, and limitations. The framework is pending validation; current rankings use demonstration data.",
  "/methodology"
);

export default async function MethodologyPage() {
  const provider = getSoilDataProvider();
  const indicators = await provider.getIndicators();

  return (
    <main className="min-h-[calc(100vh-96px)] px-5 pb-8 pt-5 sm:px-8 lg:px-[34px] lg:pt-6">
      <PageEarthStrip
        eyebrow="Methodology"
        title="Soil Index methodology."
        description="A proposed nine-indicator framework and mock data contract, pending scientific validation."
        panelLabel="Index framework"
        panelItems={[["Nine", "Indicators"], ["Open", "Metadata"], ["Comparable", "Scoring"], ["Clear", "Limits"]]}
        panel={<MethodologyPulse />}
      />

      <section className="py-8">
        <MethodologyIndicatorGrid indicators={indicators} />
      </section>
      <nav aria-label="Explore Soil Index" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-sm text-[#a7d87d]">
        <Link href="/">Global rankings</Link>
        <Link href="/#rankings">Country profiles</Link>
        <Link href="/about">About Soil Index</Link>
      </nav>
    </main>
  );
}
