"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { getAllCountries } from "@/lib/soil-data";
import type { PolicyStatus } from "@/data/countries";

const INITIAL_VISIBLE_COUNT = 8;

function policyClass(policy: PolicyStatus) {
  if (policy === "Strong") return "bg-[#edf7dc] text-[#3c6416]";
  if (policy === "Moderate") return "bg-[#fff4ce] text-[#785c00]";
  if (policy === "Weak") return "bg-[#fff0e2] text-[#8a4616]";
  return "bg-[#fde9e7] text-[#98362f]";
}
function scoreColor(score: number) {
  if (score >= 70) return "bg-[#6e9d24]";
  if (score >= 50) return "bg-[#d8a928]";
  if (score >= 30) return "bg-[#d87832]";
  return "bg-[#c74b42]";
}

export function RankingsTable() {
  const countries = getAllCountries();
  const regions = useMemo(
    () => Array.from(new Set(countries.map((country) => country.region))).sort(),
    [countries]
  );
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All regions");
  const [policy, setPolicy] = useState("All policy levels");
  const [showAll, setShowAll] = useState(false);

  const filteredCountries = useMemo(() => {
    const query = search.toLowerCase().trim();

    return countries.filter((country) => {
      const matchesSearch =
        !query ||
        country.name.toLowerCase().includes(query) ||
        country.region.toLowerCase().includes(query);
      const matchesRegion = region === "All regions" || country.region === region;
      const matchesPolicy =
        policy === "All policy levels" || country.policyStatus === policy;

      return matchesSearch && matchesRegion && matchesPolicy;
    });
  }, [countries, policy, region, search]);

  const visibleCountries = showAll
    ? filteredCountries
    : filteredCountries.slice(0, INITIAL_VISIBLE_COUNT);
  const hasFilters =
    Boolean(search) || region !== "All regions" || policy !== "All policy levels";

  function resetFilters() {
    setSearch("");
    setRegion("All regions");
    setPolicy("All policy levels");
    setShowAll(false);
  }

  return (
    <section id="rankings" className="gsi-card scroll-mt-20 overflow-hidden">
      <div className="border-b border-[#dce4dd] px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="gsi-kicker">Global benchmark</p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#14201b]">
              Country rankings
            </h2>
            <p className="mt-1 text-sm text-[#64716a]">
              Compare overall performance across health, resilience, and policy.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#64716a]">
            <span className="size-2 rounded-full bg-[#6e9d24]" />
            {filteredCountries.length} countries in view
          </div>
        </div>

        <div className="mt-5 grid gap-2 md:grid-cols-[minmax(220px,1fr)_180px_180px_auto]">
          <label className="gsi-control flex items-center gap-2 px-3">
            <Search size={16} className="shrink-0 text-[#738078]" />
            <span className="sr-only">Search countries</span>
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setShowAll(false);
              }}
              placeholder="Search country or region"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#8a958f]"
            />
          </label>

          <label className="gsi-control relative flex items-center">
            <span className="sr-only">Filter by region</span>
            <select
              value={region}
              onChange={(event) => {
                setRegion(event.target.value);
                setShowAll(false);
              }}
              className="h-full w-full appearance-none bg-transparent px-3 pr-9 text-sm outline-none"
            >
              <option>All regions</option>
              {regions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 text-[#738078]" />
          </label>

          <label className="gsi-control relative flex items-center">
            <span className="sr-only">Filter by policy level</span>
            <select
              value={policy}
              onChange={(event) => {
                setPolicy(event.target.value);
                setShowAll(false);
              }}
              className="h-full w-full appearance-none bg-transparent px-3 pr-9 text-sm outline-none"
            >
              <option>All policy levels</option>
              <option>Strong</option>
              <option>Moderate</option>
              <option>Weak</option>
              <option>Critical</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 text-[#738078]" />
          </label>

          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasFilters}
            className="gsi-control flex items-center justify-center gap-2 px-3 text-sm font-semibold text-[#516058] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {hasFilters ? <X size={15} /> : <SlidersHorizontal size={15} />}
            {hasFilters ? "Reset" : "Filters"}
          </button>
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[780px] text-sm">
          <thead className="bg-[#f7f9f6] text-[11px] font-bold uppercase tracking-[0.08em] text-[#718078]">
            <tr>
              <th className="px-5 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Country</th>
              <th className="px-4 py-3 text-left">Region</th>
              <th className="px-4 py-3 text-left">GSI score</th>
              <th className="px-4 py-3 text-left">1Y change</th>
              <th className="px-4 py-3 text-left">Coverage</th>
              <th className="px-5 py-3 text-right">Policy</th>
            </tr>
          </thead>
          <tbody>
            {visibleCountries.map((country) => {
              const improving = country.change1Y > 0;

              return (
                <tr
                  key={country.slug}
                  className="border-t border-[#e7ece8] transition hover:bg-[#f8faf7]"
                >
                  <td className="px-5 py-4 font-bold text-[#7a867f]">
                    {String(country.rank).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3 font-bold text-[#14201b]">
                      <span className="text-xl" aria-hidden="true">{country.flag}</span>
                      {country.name}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[#64716a]">{country.region}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-7 font-extrabold text-[#14201b]">{country.score}</span>
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#e5ebe6]">
                        <div
                          className={`h-full rounded-full ${scoreColor(country.score)}`}
                          style={{ width: `${country.score}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 font-bold ${improving ? "text-[#50791b]" : "text-[#b3443c]"}`}>
                      {improving ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      {Math.abs(country.change1Y).toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#64716a]">{country.indicators} indicators</td>
                  <td className="px-5 py-4 text-right">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${policyClass(country.policyStatus)}`}>
                      {country.policyStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-[#e7ece8] md:hidden">
        {visibleCountries.map((country) => {
          const improving = country.change1Y > 0;

          return (
            <article key={country.slug} className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f0f3ef] text-xs font-bold text-[#65726b]">
                    {country.rank}
                  </span>
                  <span className="text-2xl" aria-hidden="true">{country.flag}</span>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold">{country.name}</h3>
                    <p className="text-xs text-[#718078]">{country.region}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${policyClass(country.policyStatus)}`}>
                  {country.policyStatus}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto_auto] items-end gap-4">
                <div>
                  <div className="flex items-baseline justify-between text-xs text-[#718078]">
                    <span>GSI score</span>
                    <strong className="text-lg text-[#14201b]">{country.score}</strong>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e5ebe6]">
                    <div className={`h-full rounded-full ${scoreColor(country.score)}`} style={{ width: `${country.score}%` }} />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase text-[#849087]">1Y</div>
                  <div className={`text-xs font-bold ${improving ? "text-[#50791b]" : "text-[#b3443c]"}`}>
                    {improving ? "+" : "-"}{Math.abs(country.change1Y).toFixed(1)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase text-[#849087]">Data</div>
                  <div className="text-xs font-bold">{country.indicators}</div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {visibleCountries.length === 0 && (
        <div className="px-5 py-12 text-center">
          <p className="font-semibold">No countries match these filters.</p>
          <button type="button" onClick={resetFilters} className="mt-2 text-sm font-bold text-[#4f721d]">
            Clear filters
          </button>
        </div>
      )}

      {filteredCountries.length > INITIAL_VISIBLE_COUNT && (
        <div className="border-t border-[#dce4dd] bg-[#fbfcfb] p-3 text-center">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="inline-flex min-h-10 items-center gap-1.5 px-3 text-sm font-bold text-[#466b16]"
          >
            {showAll ? (
              <>Show top {INITIAL_VISIBLE_COUNT} <ChevronUp size={16} /></>
            ) : (
              <>Show all {filteredCountries.length} countries <ChevronDown size={16} /></>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
