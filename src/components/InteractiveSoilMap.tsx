"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CountryRanking, CountryRegion } from "@/lib/soil-types";
import { cn } from "@/lib/utils";

type InteractiveSoilMapProps = {
  countries: CountryRanking[];
};

const regionLabels: Array<"all" | CountryRegion> = [
  "all",
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
];

function scoreClass(score: number | null) {
  if (score === null) return "bg-white/28 ring-white/20";
  if (score >= 70) return "bg-[#8cbf60] ring-[#8cbf60]/30";
  if (score >= 50) return "bg-[#d7be61] ring-[#d7be61]/30";
  if (score >= 30) return "bg-[#d78d55] ring-[#d78d55]/30";
  return "bg-[#e05d58] ring-[#e05d58]/30";
}

function formatScore(score: number | null) {
  return score === null ? "Unavailable" : score.toFixed(1);
}

export function InteractiveSoilMap({ countries }: InteractiveSoilMapProps) {
  const [region, setRegion] = useState<"all" | CountryRegion>("all");
  const [activeSlug, setActiveSlug] = useState(countries[0]?.slug ?? "");

  const filteredCountries = useMemo(
    () =>
      region === "all"
        ? countries
        : countries.filter((country) => country.region === region),
    [countries, region]
  );

  const activeCountry =
    countries.find((country) => country.slug === activeSlug) ?? filteredCountries[0];

  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="overflow-hidden rounded-md border border-white/[0.1] bg-[#10181b]">
        <div className="flex flex-wrap gap-2 border-b border-white/[0.08] px-4 py-3">
          {regionLabels.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setRegion(item);
                const first = item === "all" ? countries[0] : countries.find((country) => country.region === item);
                if (first) setActiveSlug(first.slug);
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.05em] transition",
                region === item
                  ? "border-[#8cbf60] bg-[#8cbf60]/12 text-[#b8df8a]"
                  : "border-white/12 text-white/48 hover:border-white/24 hover:text-white"
              )}
            >
              {item === "all" ? "All regions" : item}
            </button>
          ))}
        </div>

        <div className="relative aspect-[1.8/1] min-h-[340px] overflow-hidden bg-[radial-gradient(circle_at_50%_52%,rgba(140,191,96,0.08),transparent_48%),linear-gradient(180deg,#0f171a,#0b1114)]">
          <div className="absolute left-[10%] top-[20%] h-[33%] w-[24%] rounded-[48%] border border-white/[0.06] bg-white/[0.025]" />
          <div className="absolute left-[32%] top-[54%] h-[34%] w-[12%] rounded-[48%] border border-white/[0.06] bg-white/[0.025]" />
          <div className="absolute left-[45%] top-[19%] h-[19%] w-[18%] rounded-[48%] border border-white/[0.06] bg-white/[0.025]" />
          <div className="absolute left-[48%] top-[42%] h-[33%] w-[15%] rounded-[48%] border border-white/[0.06] bg-white/[0.025]" />
          <div className="absolute left-[57%] top-[22%] h-[45%] w-[28%] rounded-[48%] border border-white/[0.06] bg-white/[0.025]" />
          <div className="absolute left-[79%] top-[65%] h-[18%] w-[14%] rounded-[48%] border border-white/[0.06] bg-white/[0.025]" />

          {filteredCountries.map((country) => {
            const active = country.slug === activeCountry?.slug;
            return (
              <Link
                key={country.slug}
                href={`/country/${country.slug}`}
                onMouseEnter={() => setActiveSlug(country.slug)}
                onFocus={() => setActiveSlug(country.slug)}
                className={cn(
                  "absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 transition hover:z-10 hover:scale-150 focus-visible:z-10 focus-visible:scale-150 focus-visible:outline-none focus-visible:ring-[#b8df8a]",
                  scoreClass(country.score),
                  active && "z-10 scale-150"
                )}
                style={{
                  left: `${country.mapPosition.x}%`,
                  top: `${country.mapPosition.y}%`,
                }}
                aria-label={`${country.name}: score ${formatScore(country.score)}, rank ${
                  country.rank ?? "unavailable"
                }`}
              />
            );
          })}
        </div>

        <div className="grid border-t border-white/[0.08] sm:grid-cols-4">
          {[
            ["70-100", "Resilient", "#8cbf60"],
            ["50-69", "Stable", "#d7be61"],
            ["30-49", "Stressed", "#d78d55"],
            ["0-29", "Critical", "#e05d58"],
          ].map(([range, label, color], index) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-3 px-4 py-4",
                index > 0 && "border-t border-white/[0.08] sm:border-l sm:border-t-0"
              )}
            >
              <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
              <div>
                <div className="text-[10px] font-semibold uppercase">{label}</div>
                <div className="mt-0.5 text-[9px] text-white/30">{range}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="rounded-md border border-white/[0.1] bg-[#141d21] p-5">
        {activeCountry ? (
          <>
            <p className="gsi-kicker">Selected country</p>
            <h2 className="mt-2 text-3xl font-light uppercase">{activeCountry.name}</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-white/[0.08] p-4">
                <p className="text-[9px] uppercase tracking-[0.08em] text-white/34">Score</p>
                <p className="mt-2 text-2xl font-light tabular-nums">
                  {formatScore(activeCountry.score)}
                </p>
              </div>
              <div className="rounded-md border border-white/[0.08] p-4">
                <p className="text-[9px] uppercase tracking-[0.08em] text-white/34">Rank</p>
                <p className="mt-2 text-2xl font-light tabular-nums text-[#8cbf60]">
                  {activeCountry.rank ? `#${activeCountry.rank}` : "NA"}
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/46">{activeCountry.sourceSummary}</p>
            <Link
              href={`/country/${activeCountry.slug}`}
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-full border border-[#8cbf60]/55 px-4 text-xs font-semibold uppercase tracking-[0.05em] text-[#b8df8a] transition hover:bg-[#8cbf60]/10"
            >
              Open profile
            </Link>
          </>
        ) : (
          <p className="text-sm text-white/48">No country data is available for this region.</p>
        )}
      </aside>
    </section>
  );
}
