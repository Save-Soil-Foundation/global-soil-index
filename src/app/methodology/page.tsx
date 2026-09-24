import type { Metadata } from "next";
import { AlertTriangle, Database, Layers3, Scale } from "lucide-react";
import { getSoilDataProvider } from "@/lib/soil-data";

export const metadata: Metadata = {
  title: "Methodology | Global Soil Index",
  description: "The proposed Global Soil Index indicator framework, data sources, and limitations.",
};

export default async function MethodologyPage() {
  const provider = getSoilDataProvider();
  const [indicators, metadata] = await Promise.all([
    provider.getIndicators(),
    provider.getMetadata(),
  ]);

  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] max-w-[1400px] px-5 py-8 sm:px-8 lg:px-[34px] lg:py-10">
      <header className="border-b border-white/10 pb-8">
        <p className="gsi-kicker">Methodology</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
          Transparent inputs. Comparable outcomes.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/48">
          This frontend implements a proposed nine-indicator soil-health framework
          and a mock provider contract. It does not claim that the prototype scores
          have been scientifically validated.
        </p>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          [Layers3, "Indicator families", "Nine comparable soil-health and readiness signals."],
          [Database, "Source metadata", "Every profile keeps availability and source status visible."],
          [Scale, "Comparable scoring", "Scores are normalized for UI testing, not scientific publication."],
        ].map(([Icon, title, text]) => {
          const ItemIcon = Icon as typeof Layers3;
          return (
            <article key={title as string} className="rounded-md border border-white/[0.08] bg-[#141d21] p-5">
              <ItemIcon size={18} className="text-[#8cbf60]" />
              <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.04em]">
                {title as string}
              </h2>
              <p className="mt-2 text-xs leading-5 text-white/42">{text as string}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="gsi-kicker">Indicator definitions</p>
            <h2 className="mt-2 text-2xl font-light uppercase">Proposed scoring inputs</h2>
          </div>
          <p className="max-w-xl text-xs leading-5 text-white/38">{metadata.sourceNote}</p>
        </div>

        <div className="mt-5 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {indicators.map((indicator, index) => (
            <article
              key={indicator.id}
              className={`p-5 ${index > 0 ? "border-t border-white/10" : ""} ${index % 2 === 1 ? "sm:border-l" : ""} ${index > 1 ? "sm:border-t" : ""} ${index % 3 !== 0 ? "lg:border-l" : "lg:border-l-0"} ${index > 2 ? "lg:border-t" : "lg:border-t-0"}`}
            >
              <span className="text-[10px] font-semibold text-[#8cbf60]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.04em]">
                {indicator.label}
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/42">{indicator.description}</p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.06em] text-white/30">
                {indicator.sourceType}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-md border border-[#d7be61]/20 bg-[#d7be61]/8 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={19} className="mt-0.5 text-[#d7be61]" />
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.04em] text-[#efd983]">
              Measurement limitations
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-white/54">
              The current app uses stable mock values to test visual layouts,
              search, filtering, profiles, maps, and API-readiness. Production
              rankings must come from verified source data, calibration methods,
              uncertainty estimates, and review processes before being described
              as authoritative.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
