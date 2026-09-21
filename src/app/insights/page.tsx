import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Database, LineChart } from "lucide-react";
import { CountryFlag } from "@/components/CountryFlag";
import { getSoilDataProvider } from "@/lib/soil-data";

export const metadata: Metadata = {
  title: "Insights | Global Soil Index",
  description: "Global soil-health statistics, comparisons, trends, and research updates.",
};

export default async function InsightsPage() {
  const provider = getSoilDataProvider();
  const [countries, summary, metadata] = await Promise.all([
    provider.getRankings(),
    provider.getSummary(),
    provider.getMetadata(),
  ]);

  const topCountries = countries.slice(0, 5);
  const mostImproved = [...countries]
    .filter((country) => country.historicalChange !== null)
    .sort((left, right) => (right.historicalChange ?? 0) - (left.historicalChange ?? 0))
    .slice(0, 5);
  const mostDeclined = [...countries]
    .filter((country) => country.historicalChange !== null)
    .sort((left, right) => (left.historicalChange ?? 0) - (right.historicalChange ?? 0))
    .slice(0, 5);
  const regionRows = Array.from(new Set(countries.map((country) => country.region))).map(
    (region) => {
      const regionCountries = countries.filter((country) => country.region === region);
      const average =
        regionCountries.reduce((total, country) => total + (country.score ?? 0), 0) /
        regionCountries.length;
      return { region, average: Number(average.toFixed(1)), count: regionCountries.length };
    }
  );

  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] max-w-[1400px] px-5 py-8 sm:px-8 lg:px-[34px] lg:py-10">
      <header className="border-b border-white/10 pb-8">
        <p className="gsi-kicker">Insights</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
          Signals behind the scores.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/48">
          Prototype global statistics, country comparisons, available historical
          trends, regional comparisons, and research update surfaces powered by
          the shared data provider.
        </p>
      </header>

      <section className="mt-8 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Global average", summary.averageScore?.toFixed(1) ?? "N/A", "out of 100"],
          ["Complete data", summary.completeDataCount.toString(), "prototype countries"],
          ["Partial data", summary.partialDataCount.toString(), "prototype countries"],
          ["Limited data", summary.limitedDataCount.toString(), "prototype countries"],
        ].map(([label, value, detail], index) => (
          <article
            key={label}
            className={`px-5 py-6 ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}
          >
            <p className="text-[10px] uppercase tracking-[0.1em] text-white/34">{label}</p>
            <p className="mt-2 text-4xl font-light tabular-nums">{value}</p>
            <p className="mt-1 text-[10px] text-white/30">{detail}</p>
          </article>
        ))}
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-md border border-white/[0.08] bg-[#141d21] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="gsi-kicker">Country comparison</p>
              <h2 className="mt-1 text-lg font-medium uppercase">Leading prototype scores</h2>
            </div>
            <Database size={18} className="text-[#8cbf60]" />
          </div>
          <ol className="mt-5 divide-y divide-white/8">
            {topCountries.map((country) => (
              <li
                key={country.slug}
                className="grid grid-cols-[42px_1fr_auto] items-center gap-3 py-3 first:pt-0"
              >
                <CountryFlag country={country} width={34} height={23} />
                <div>
                  <Link
                    href={`/country/${country.slug}`}
                    className="text-xs font-semibold hover:text-[#8cbf60]"
                  >
                    {country.name}
                  </Link>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full bg-[#8cbf60]" style={{ width: `${country.score ?? 0}%` }} />
                  </div>
                </div>
                <span className="text-xs font-semibold tabular-nums text-[#b8df8a]">
                  {country.score?.toFixed(1) ?? "N/A"}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-md border border-white/[0.08] bg-[#141d21] p-5 sm:p-6">
          <p className="gsi-kicker">Available trends</p>
          <h2 className="mt-1 text-lg font-medium uppercase">Largest historical moves</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8cbf60]">
                <ArrowUpRight size={14} /> Most improved
              </h3>
              <div className="mt-3 divide-y divide-white/8">
                {mostImproved.map((country) => (
                  <div key={country.slug} className="flex items-center gap-2 py-2.5 first:pt-0">
                    <CountryFlag country={country} width={24} height={16} />
                    <span className="min-w-0 flex-1 truncate text-xs">{country.name}</span>
                    <span className="text-xs font-semibold tabular-nums text-[#8cbf60]">
                      +{country.historicalChange?.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#e05d58]">
                <ArrowDownRight size={14} /> Most declined
              </h3>
              <div className="mt-3 divide-y divide-white/8">
                {mostDeclined.map((country) => (
                  <div key={country.slug} className="flex items-center gap-2 py-2.5 first:pt-0">
                    <CountryFlag country={country} width={24} height={16} />
                    <span className="min-w-0 flex-1 truncate text-xs">{country.name}</span>
                    <span className="text-xs font-semibold tabular-nums text-[#e05d58]">
                      {country.historicalChange?.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-md border border-white/[0.08] bg-[#141d21] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="gsi-kicker">Regional comparisons</p>
              <h2 className="mt-1 text-lg font-medium uppercase">Average by region</h2>
            </div>
            <LineChart size={18} className="text-[#8cbf60]" />
          </div>
          <div className="mt-5 space-y-3">
            {regionRows
              .sort((left, right) => right.average - left.average)
              .map((row) => (
                <div key={row.region}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>{row.region}</span>
                    <span className="text-white/46">
                      {row.average.toFixed(1)} / {row.count} countries
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full bg-[#8cbf60]" style={{ width: `${row.average}%` }} />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <aside className="rounded-md border border-white/[0.08] bg-[#141d21] p-5 sm:p-6">
          <p className="gsi-kicker">Research updates</p>
          <h2 className="mt-1 text-lg font-medium uppercase">Prototype status</h2>
          <p className="mt-4 text-sm leading-6 text-white/50">{metadata.sourceNote}</p>
          <div className="mt-5 rounded-md border border-[#8cbf60]/20 bg-[#8cbf60]/8 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#b8df8a]">
              Provider
            </p>
            <p className="mt-2 text-xs leading-5 text-white/48">
              Current frontend provider: {metadata.provider}. Updated {metadata.updateLabel}.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
