import { pageMetadata } from "@/lib/seo";
import { InteractiveSoilMap } from "@/components/InteractiveSoilMap";
import { getSoilDataProvider } from "@/lib/soil-data";

export const metadata = pageMetadata(
  "Soil Health Map | Soil Index",
  "Explore prototype spatial patterns in global soil health and resilience.",
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
    <main className="mx-auto min-h-[calc(100vh-96px)] max-w-[1600px] px-5 py-8 sm:px-8 lg:px-[34px] lg:py-10">
      <header className="flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="gsi-kicker">Spatial intelligence</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
            Global soil health map.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/48">
            A functional local map layer for country selection, regional filtering,
            profile navigation, and missing-data states while the production soil API is pending.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-white/36">
          <span className="size-2 rounded-full bg-[#8cbf60]" /> {metadata.statusLabel}
        </div>
      </header>

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
    </main>
  );
}
