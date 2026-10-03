import { pageMetadata } from "@/lib/seo";
import { PageEarthStrip } from "@/components/PageEarthStrip";
import { MethodologyPulse } from "@/components/MethodologyPulse";
import { MethodologyIndicatorGrid } from "@/components/MethodologyIndicatorGrid";
import { getSoilDataProvider } from "@/lib/soil-data";

export const metadata = pageMetadata(
  "Methodology | Soil Index",
  "The proposed Global Soil Index indicator framework, data sources, and limitations.",
  "/methodology"
);

export default async function MethodologyPage() {
  const provider = getSoilDataProvider();
  const indicators = await provider.getIndicators();

  return (
    <main className="min-h-[calc(100vh-96px)] px-5 pb-8 pt-5 sm:px-8 lg:px-[34px] lg:pt-6">
      <PageEarthStrip
        eyebrow="Methodology"
        title="Transparent inputs. Comparable outcomes."
        description="A proposed nine-indicator framework and mock data contract, pending scientific validation."
        panelLabel="Index framework"
        panelItems={[["Nine", "Indicators"], ["Open", "Metadata"], ["Comparable", "Scoring"], ["Clear", "Limits"]]}
        panel={<MethodologyPulse />}
      />

      <section className="py-8">
        <MethodologyIndicatorGrid indicators={indicators} />
      </section>
    </main>
  );
}
