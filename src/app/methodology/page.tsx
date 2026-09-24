import { pageMetadata } from "@/lib/seo";
import { AboutGSI } from "@/components/AboutGSI";

export const metadata = pageMetadata(
  "Methodology | Soil Index",
  "How the Global Soil Index measures, verifies, and compares national soil health.",
  "/methodology"
);

const indicators = [
  ["01", "Soil organic carbon", "Long-term carbon storage and biological productivity."],
  ["02", "Erosion risk", "Exposure to water, wind, and land-use-driven soil loss."],
  ["03", "Vegetation cover", "Protective living cover observed across seasonal cycles."],
  ["04", "Nutrient balance", "Availability and stability of essential soil nutrients."],
  ["05", "Soil moisture", "Water availability and resilience through dry periods."],
  ["06", "Compaction pressure", "Physical constraints on roots, water, and soil organisms."],
  ["07", "Salinity stress", "Salt accumulation that limits productive soil function."],
  ["08", "Soil biodiversity", "Biological diversity supporting living soil systems."],
  ["09", "Policy readiness", "National monitoring, targets, and restoration commitments."],
];

export default function MethodologyPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="border-b border-white/10 pb-9">
        <p className="gsi-kicker">Methodology</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
          Transparent inputs. Comparable outcomes.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/48">
          Every score is built from a consistent nine-indicator framework, with
          source quality, coverage, and uncertainty kept visible.
        </p>
      </header>

      <div className="mt-10">
        <AboutGSI />
      </div>

      <section className="mt-14 border-t border-white/10 pt-8">
        <p className="gsi-kicker">Index architecture</p>
        <div className="mt-6 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {indicators.map(([number, title, description], index) => (
            <article
              key={title}
              className={`p-5 sm:p-6 ${index > 0 ? "border-t border-white/10" : ""} ${index % 2 === 1 ? "sm:border-l" : ""} ${index > 1 ? "sm:border-t" : ""} ${index % 3 !== 0 ? "lg:border-l" : "lg:border-l-0"} ${index > 2 ? "lg:border-t" : "lg:border-t-0"}`}
            >
              <span className="text-[10px] font-semibold text-[#79bd45]">{number}</span>
              <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.04em]">{title}</h2>
              <p className="mt-2 text-xs leading-5 text-white/40">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
