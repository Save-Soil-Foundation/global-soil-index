"use client";

import { useMemo, useState } from "react";
import { Filter, Info, Search } from "lucide-react";
import { getAllCountries } from "@/lib/soil-data";

const INITIAL_VISIBLE_COUNT = 6;

function policyClass(policy: string) {
  if (policy === "Strong") return "border-lime-400 text-lime-300";
  if (policy === "Moderate") return "border-yellow-400 text-yellow-300";
  if (policy === "Weak") return "border-orange-500 text-orange-400";
  return "border-red-500 text-red-400";
}

function scoreColor(score: number) {
  if (score >= 70) return "bg-lime-400";
  if (score >= 50) return "bg-yellow-400";
  if (score >= 30) return "bg-orange-500";
  return "bg-red-500";
}

export function RankingsTable() {
  const countries = getAllCountries();
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const query = search.toLowerCase().trim();

      if (!query) return true;

      return (
        country.name.toLowerCase().includes(query) ||
        country.region.toLowerCase().includes(query) ||
        country.incomeGroup.toLowerCase().includes(query)
      );
    });
  }, [countries, search]);

  const visibleCountries = showAll
    ? filteredCountries
    : filteredCountries.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <section className="gsi-card overflow-hidden">
      <div className="flex flex-col gap-4 border-b gsi-border p-4 lg:flex-row lg:items-center lg:justify-between xl:gsi-card-padding">
        <div>
          <h2 className="gsi-heading flex items-center gap-2 text-2xl xl:text-xl">
            Country Rankings <Info size={15} className="text-sky-300" />
          </h2>
          <p className="text-sm text-white/65 xl:text-xs">
            Overall Soil Health Performance
          </p>
        </div>

        <div className="flex flex-wrap gap-3 xl:gap-2">
          <label className="flex h-10 items-center gap-2 rounded-md border gsi-border px-3 text-sm text-white/70 xl:h-9 xl:text-xs">
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setShowAll(false);
              }}
              placeholder="Search country..."
              className="w-36 bg-transparent text-white outline-none placeholder:text-white/45 xl:w-32"
            />
            <Search size={16} />
          </label>

          <button className="h-10 cursor-pointer rounded-md border gsi-border px-4 text-sm transition hover:bg-white/5 xl:h-9 xl:px-3 xl:text-xs">
            All Regions
          </button>

          <button className="h-10 cursor-pointer rounded-md border gsi-border px-4 text-sm transition hover:bg-white/5 xl:h-9 xl:px-3 xl:text-xs">
            All Income Groups
          </button>

          <button className="flex h-10 cursor-pointer items-center gap-2 rounded-md border gsi-border px-4 text-sm transition hover:bg-white/5 xl:h-9 xl:px-3 xl:text-xs">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm xl:text-[13px]">
          <thead className="text-xs uppercase text-white/55">
            <tr className="border-b gsi-border">
              <th className="gsi-table-cell text-left">Rank</th>
              <th className="gsi-table-cell text-left">Country</th>
              <th className="gsi-table-cell text-left">Region</th>
              <th className="gsi-table-cell text-left">GSI Score</th>
              <th className="gsi-table-cell text-left">Trend</th>
              <th className="gsi-table-cell text-left">Change (1Y)</th>
              <th className="gsi-table-cell text-left">Indicators</th>
              <th className="gsi-table-cell text-left">Policy Status</th>
            </tr>
          </thead>

          <tbody>
            {visibleCountries.map((country) => (
              <tr
                key={country.slug}
                className="border-b border-blue-300/10 transition hover:bg-sky-400/5"
              >
                <td className="gsi-table-cell text-lg font-bold xl:text-base">
                  {country.rank}
                </td>

                <td className="gsi-table-cell font-bold">
                  <span className="mr-3 text-2xl xl:text-xl">
                    {country.flag}
                  </span>
                  {country.name}
                </td>

                <td className="gsi-table-cell text-white/75">
                  {country.region}
                </td>

                <td className="gsi-table-cell">
                  <div className="flex items-center gap-3">
                    <span className="w-10 font-bold">{country.score}</span>
                    <div className="h-2 w-28 rounded-full bg-blue-950 xl:w-24">
                      <div
                        className={`h-2 rounded-full ${scoreColor(
                          country.score
                        )}`}
                        style={{ width: `${country.score}%` }}
                      />
                    </div>
                  </div>
                </td>

                <td
                  className={`gsi-table-cell ${
                    country.trend === "up" ? "text-lime-400" : "text-red-500"
                  }`}
                >
                  {country.trend === "up" ? "⌁⌁⌁↗" : "⌁⌁⌁↘"}
                </td>

                <td
                  className={`gsi-table-cell font-semibold ${
                    country.change1Y > 0 ? "text-lime-400" : "text-red-500"
                  }`}
                >
                  {country.change1Y > 0 ? "+" : ""}
                  {country.change1Y} {country.change1Y > 0 ? "↑" : "↓"}
                </td>

                <td className="gsi-table-cell">{country.indicators}</td>

                <td className="gsi-table-cell">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${policyClass(
                      country.policyStatus
                    )}`}
                  >
                    {country.policyStatus}
                  </span>
                </td>
              </tr>
            ))}

            {visibleCountries.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-white/60">
                  No countries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredCountries.length > INITIAL_VISIBLE_COUNT && (
        <button
          onClick={() => setShowAll((value) => !value)}
          className="w-full cursor-pointer p-3 text-center text-sm font-semibold text-lime-300 transition hover:bg-lime-400/5 xl:py-2.5 xl:text-xs"
        >
          {showAll
            ? "Show Less ↑"
            : `View All ${filteredCountries.length} Countries →`}
        </button>
      )}
    </section>
  );
}