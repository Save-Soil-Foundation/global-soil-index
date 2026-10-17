import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageEarthStrip } from "@/components/PageEarthStrip";
import { InteractiveSoilMap } from "@/components/InteractiveSoilMap";
import { getSoilDataProvider } from "@/lib/soil-data";

export const metadata = pageMetadata(
  "Global Soil Health Map | Soil Index",
  "Explore the Soil Index world map, browse country profiles, and view regional context. Current scores are demonstration data, not verified measurements.",
  "/map"
);

export default async function MapPage() {
  const provider = getSoilDataProvider();
  const [countries, summary, metadata] = await Promise.all([
    provider.getRankings(),
    provider.getSummary(),
    provider.getMetadata(),
  ]);

  return (
    <main className="min-h-[calc(100vh-96px)] px-5 pb-8 pt-5 sm:px-8 lg:px-[34px] lg:pt-6">
      <PageEarthStrip
        eyebrow="Spatial intelligence"
        title="Global soil health map."
        description="Country selection, regional filtering, profile navigation, and data-availability context in one map view."
        panelLabel={metadata.statusLabel}
        panelItems={[["Country", "Selection"], ["Regional", "Filters"], ["Profile", "Links"], ["Data", "Context"]]}
      />

      <InteractiveSoilMap countries={countries} />

      <section className="mt-8 grid border-y border-white/10 md:grid-cols-3">
        {[
          [summary.averageScore?.toFixed(1) ?? "N/A", "Global average", "Prototype composite score"],
          [summary.leadingRegion ?? "N/A", "Leading region", "Highest current median"],
          [summary.priorityRegion ?? "N/A", "Priority region", "Lowest current median"],
        ].map(([value, label, detail], index) => (
          <article
            key={label}
            className={`px-5 py-6 ${index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}
          >
            <p className="text-2xl font-light">{value}</p>
            <h2 className="mt-2 text-[10px] font-semibold uppercase tracking-[0.08em]">
              {label}
            </h2>
            <p className="mt-1 text-[10px] text-white/32">{detail}</p>
          </article>
        ))}
      </section>
      <nav aria-label="Explore Soil Index" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-sm text-[#a7d87d]">
        <Link href="/">Global rankings</Link>
        <Link href="/#rankings">Country profiles</Link>
        <Link href="/methodology">Methodology & limitations</Link>
      </nav>
    </main>
  );
}
