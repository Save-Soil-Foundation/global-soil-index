"use client";

import { ChevronDown, Filter, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { GlobalSoilPulse } from "@/components/GlobalSoilPulse";
import { CountryRankCard } from "@/components/CountryRankCard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  CountryRanking,
  CountryRegion,
  DataAvailability,
  DatasetMetadata,
  SoilTickerItem,
} from "@/lib/soil-types";
import { cn } from "@/lib/utils";
import { countryGroups, matchesCountryGroup, type CountryGroup } from "@/lib/country-groups";

type SortOption = "rank" | "score" | "name" | "historical-change";
type ScoreRange = "all" | "70-plus" | "50-69" | "30-49" | "0-29";
type RankRange = "all" | "1-20" | "1-50" | "51-100" | "101-196";
type AvailabilityFilter = "all" | DataAvailability;

type RankingsTableProps = {
  rankings: CountryRanking[];
  metadata: DatasetMetadata;
  tickerItems: SoilTickerItem[];
};

const GlobalSoilTicker = dynamic(
  () => import("@/components/GlobalSoilTicker").then((module) => module.GlobalSoilTicker),
  {
    loading: () => (
      <div className="mt-4 min-h-[76px] animate-pulse rounded-md border border-white/[0.12] bg-[#11191c]">
        <div className="h-full min-h-[76px] bg-[linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0.08),rgba(255,255,255,0.03))]" />
      </div>
    ),
    ssr: false,
  }
);

const sortLabels: Record<SortOption, string> = {
  rank: "Rank",
  score: "Score",
  name: "Country name",
  "historical-change": "Historical change",
};

const scoreRangeLabels: Record<ScoreRange, string> = {
  all: "All score ranges",
  "70-plus": "70 and above",
  "50-69": "50 to 69",
  "30-49": "30 to 49",
  "0-29": "0 to 29",
};

const rankRangeLabels: Record<RankRange, string> = {
  all: "All ranks",
  "1-20": "Rank 1 to 20",
  "1-50": "Rank 1 to 50",
  "51-100": "Rank 51 to 100",
  "101-196": "Rank 101 to 196",
};

const availabilityLabels: Record<AvailabilityFilter, string> = {
  all: "All availability",
  complete: "Complete",
  partial: "Partial",
  limited: "Limited",
  unavailable: "Unavailable",
};

function scoreInRange(score: number | null, range: ScoreRange) {
  if (range === "all") return true;
  if (score === null) return false;
  if (range === "70-plus") return score >= 70;
  if (range === "50-69") return score >= 50 && score < 70;
  if (range === "30-49") return score >= 30 && score < 50;
  return score < 30;
}

function rankInRange(rank: number | null, range: RankRange) {
  if (range === "all") return true;
  if (rank === null) return false;
  if (range === "1-20") return rank <= 20;
  if (range === "1-50") return rank <= 50;
  if (range === "51-100") return rank >= 51 && rank <= 100;
  return rank >= 101;
}

function compareNullableNumbers(
  left: number | null,
  right: number | null,
  direction: "asc" | "desc"
) {
  if (left === null && right === null) return 0;
  if (left === null) return 1;
  if (right === null) return -1;
  return direction === "asc" ? left - right : right - left;
}

export function RankingsTable({ rankings, metadata, tickerItems }: RankingsTableProps) {
  const regions = useMemo(
    () =>
      Array.from(new Set(rankings.map((country) => country.region))).sort() as CountryRegion[],
    [rankings]
  );

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rank");
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [countryGroup, setCountryGroup] = useState<CountryGroup>("all");
  const [region, setRegion] = useState<"all" | CountryRegion>("all");
  const [scoreRange, setScoreRange] = useState<ScoreRange>("all");
  const [rankRange, setRankRange] = useState<RankRange>("all");
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount =
    Number(region !== "all") +
    Number(scoreRange !== "all") +
    Number(rankRange !== "all") +
    Number(availability !== "all");

  const query = search.trim().toLowerCase();
  const hasActiveFilters = activeFilterCount > 0 || countryGroup !== "all";
  const defaultVisualMode = !query && !hasActiveFilters && sortBy === "rank";

  const visibleCountries = useMemo(() => {
    const filtered = rankings.filter((country) => {
      const matchesQuery = !query || country.name.toLowerCase().includes(query);
      const matchesGroup = matchesCountryGroup(country, countryGroup);
      const matchesRegion = region === "all" || country.region === region;
      const matchesScore = scoreInRange(country.score, scoreRange);
      const matchesRank = rankInRange(country.rank, rankRange);
      const matchesAvailability =
        availability === "all" || country.dataAvailability === availability;

      return (
        matchesQuery &&
        matchesGroup &&
        matchesRegion &&
        matchesScore &&
        matchesRank &&
        matchesAvailability
      );
    });

    if (defaultVisualMode) {
      return filtered
        .filter((country) => country.featuredOrder)
        .sort((left, right) => (left.featuredOrder ?? 0) - (right.featuredOrder ?? 0));
    }

    return [...filtered].sort((left, right) => {
      if (sortBy === "score") {
        return compareNullableNumbers(left.score, right.score, "desc");
      }
      if (sortBy === "name") {
        return left.name.localeCompare(right.name);
      }
      if (sortBy === "historical-change") {
        return compareNullableNumbers(left.historicalChange, right.historicalChange, "desc");
      }
      return compareNullableNumbers(left.rank, right.rank, "asc");
    });
  }, [
    countryGroup,
    availability,
    defaultVisualMode,
    query,
    rankRange,
    rankings,
    region,
    scoreRange,
    sortBy,
  ]);

  // Keep every profile in the initial HTML without extending the default grid.
  const remainingCountries = defaultVisualMode
    ? rankings
        .filter((country) => !country.featuredOrder)
        .sort((left, right) => compareNullableNumbers(left.rank, right.rank, "asc"))
    : [];

  function clearSearch() {
    setSearch("");
  }

  function clearFilters() {
    setCountryGroup("all");
    setRegion("all");
    setScoreRange("all");
    setRankRange("all");
    setAvailability("all");
  }

  return (
    <section id="rankings" className="gsi-animate-page scroll-mt-28">
      <div className="gsi-animate-panel relative isolate -mx-5 -mt-5 bg-[#091216] sm:-mx-8 lg:-mx-[34px] lg:-mt-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-left-top brightness-110" style={{ backgroundImage: "url('/assets/earth-hero-left.png')" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,#060d10_0%,transparent_35%),linear-gradient(90deg,rgba(6,13,16,0.85)_0%,rgba(6,13,16,0.3)_45%,rgba(6,13,16,0.05)_100%)]" />
        <div className="grid items-center gap-4 px-5 py-4 sm:px-8 sm:py-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-8 lg:px-[34px] lg:py-5">
      <div className="flex min-w-0 flex-col gap-3">
        <div className="min-w-0">
          <h1 className="gsi-display text-[24px] leading-[1.08] text-white min-[380px]:text-[26px] sm:text-[30px] lg:text-[31px] xl:text-[33px]">
            Soil Index:{" "}
            <span className="text-[#8cbf60]">global soil health rankings</span>
          </h1>
          <p className="mt-1 text-[13px] text-white/48 sm:mt-1.5 sm:text-sm">
            {metadata.countryCount} Countries. 1 Global Index. Prototype rankings.
          </p>
        </div>

        <div className="flex w-full min-w-0 flex-wrap gap-2 min-[380px]:flex-nowrap sm:w-auto">
          <div className="relative min-w-[210px] flex-1 sm:w-[338px] sm:flex-none">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search countries..."
              className="h-10 w-full rounded-full border border-white/18 bg-[#0f171a] pl-4 pr-11 text-sm text-white outline-none transition placeholder:text-white/34 hover:border-white/28 focus:border-[#8cbf60]/70 focus:ring-2 focus:ring-[#8cbf60]/15"
              aria-label="Search countries"
            />
            {search ? (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-10 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-white/46 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbf60]"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            ) : null}
            <Search className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/42" />
          </div>

          <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-10 shrink-0 rounded-full border-white/18 bg-[#0f171a] px-3.5 text-xs text-white/74 sm:px-4",
                  activeFilterCount > 0 && "border-[#8cbf60]/55 text-[#b8df8a]"
                )}
                aria-label="Filter countries"
              >
                <Filter size={15} />
                Filter
                {activeFilterCount > 0 ? (
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#8cbf60] text-[10px] font-bold text-[#071006]">
                    {activeFilterCount}
                  </span>
                ) : null}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[min(94vw,430px)] overflow-hidden p-0">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">Filter countries</h2>
                  <p className="mt-1 text-xs leading-relaxed text-white/42">
                    Combine region, score, rank, and data-availability filters across
                    all 196 countries.
                  </p>
                </div>
                {activeFilterCount > 0 ? (
                  <span className="rounded-full border border-[#8cbf60]/35 px-2.5 py-1 text-[10px] font-bold uppercase text-[#b8df8a]">
                    {activeFilterCount} active
                  </span>
                ) : null}
              </div>

              <div className="grid gap-4 px-5 py-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase text-white/44">
                    Region
                  </span>
                  <Select
                    value={region}
                    onValueChange={(value) => setRegion(value as "all" | CountryRegion)}
                  >
                    <SelectTrigger aria-label="Filter by region">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All regions</SelectItem>
                      {regions.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase text-white/44">
                    Score range
                  </span>
                  <Select
                    value={scoreRange}
                    onValueChange={(value) => setScoreRange(value as ScoreRange)}
                  >
                    <SelectTrigger aria-label="Filter by score range">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(scoreRangeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase text-white/44">
                    Ranking range
                  </span>
                  <Select
                    value={rankRange}
                    onValueChange={(value) => setRankRange(value as RankRange)}
                  >
                    <SelectTrigger aria-label="Filter by ranking range">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(rankRangeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase text-white/44">
                    Data availability
                  </span>
                  <Select
                    value={availability}
                    onValueChange={(value) => setAvailability(value as AvailabilityFilter)}
                  >
                    <SelectTrigger aria-label="Filter by data availability">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(availabilityLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/10 px-5 py-4">
                <Button
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  variant="ghost"
                  size="sm"
                >
                  <X size={14} /> Clear all
                </Button>
                <PopoverClose asChild>
                  <Button size="sm" className="rounded-full">
                    View {visibleCountries.length} countries
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

          <GlobalSoilPulse rankings={rankings} metadata={metadata} />
        </div>
      </div>

      <div className="gsi-rankings-toolbar mt-3.5 grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-2 gap-y-2 sm:mt-4 sm:flex sm:flex-wrap sm:gap-5">
        <div className="text-[12px] font-semibold whitespace-nowrap uppercase tracking-normal text-[#8cbf60] sm:tracking-[0.05em]">
          {defaultVisualMode ? metadata.countryCount : visibleCountries.length} Countries
        </div>

        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger
            className="h-auto min-h-8 min-w-0 w-full justify-start gap-1 border-0 bg-transparent p-0 text-[12px] font-semibold uppercase tracking-normal text-white/44 sm:w-auto sm:tracking-[0.05em] shadow-none hover:text-white/70 focus:ring-0"
            aria-label="Sort countries"
          >
            <span className="shrink-0 text-white/42"><span className="sm:hidden">Sort:</span><span className="hidden sm:inline">Sort by:</span></span>
            <span className="truncate text-[#8cbf60]">{sortLabels[sortBy]}</span>
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="rank">{sortLabels.rank}</SelectItem>
            <SelectItem value="score">{sortLabels.score}</SelectItem>
            <SelectItem value="name">{sortLabels.name}</SelectItem>
            <SelectItem value="historical-change">{sortLabels["historical-change"]}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={countryGroup} onValueChange={(value) => setCountryGroup(value as CountryGroup)}>
          <SelectTrigger
            className="h-auto min-h-8 min-w-0 w-full justify-start gap-1 border-0 bg-transparent p-0 text-[12px] font-semibold uppercase tracking-normal text-white/44 sm:w-auto sm:tracking-[0.05em] shadow-none hover:text-white/70 focus:ring-0"
            aria-label="Regions and country groups"
          >
            <span className="hidden shrink-0 text-white/42 sm:inline">Regions &amp; groups:</span>
            <span className="truncate text-[#8cbf60]">{countryGroup === "all" ? "All countries" : countryGroups[countryGroup].label}</span>
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all">All countries</SelectItem>
            <SelectGroup>
              <SelectLabel>Country groups</SelectLabel>
              {(["g7", "g20", "brics", "eu"] as const).map((key) => (
                <SelectItem key={key} value={key}>{countryGroups[key].label}</SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Continents &amp; regions</SelectLabel>
              {(["africa", "asia", "europe", "north-america", "south-america", "oceania", "apac"] as const).map((key) => (
                <SelectItem key={key} value={key}>{countryGroups[key].label}{key === "apac" ? " (Asia + Oceania)" : ""}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {!defaultVisualMode ? (
          <p className="col-span-3 text-[11px] text-white/34" aria-live="polite">
            Showing {visibleCountries.length} matching countries
          </p>
        ) : null}
      </div>

      <div className="sm:hidden">
        <GlobalSoilTicker items={tickerItems} metadata={metadata} />
      </div>

      <div id="country-rankings-grid" className="mt-3 grid grid-cols-2 gap-[7px] min-[520px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10">
        {visibleCountries.map((country, index) => (
          <CountryRankCard key={country.slug} country={country} index={index} />
        ))}
        {/* Keep the remaining profile links in the initial HTML for discovery. */}
        <div className={showAllCountries ? "contents" : "hidden"}>
          {remainingCountries.map((country, index) => (
            <CountryRankCard key={country.slug} country={country} index={index + visibleCountries.length} />
          ))}
        </div>
      </div>

      {remainingCountries.length > 0 ? (
        <button
          type="button"
          aria-expanded={showAllCountries}
          aria-controls="country-rankings-grid"
          onClick={(event) => {
            const button = event.currentTarget;
            setShowAllCountries(!showAllCountries);
            if (showAllCountries) {
              // Keep the collapse control in view after the long list shrinks.
              requestAnimationFrame(() => button.scrollIntoView({ block: "nearest" }));
            }
          }}
          className="gsi-countries-toggle mx-auto mt-4 flex min-h-10 w-fit cursor-pointer items-center justify-center gap-2 rounded-full border border-white/18 bg-[#0f171a] px-4 py-2 text-xs font-semibold text-white/74 transition hover:border-[#8cbf60]/55 hover:text-[#b8df8a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98d75d]"
        >
          {showAllCountries ? "Show fewer countries" : `Show all ${rankings.length} countries`}
          <ChevronDown size={15} aria-hidden="true" className={cn("transition-transform motion-reduce:transition-none", showAllCountries && "rotate-180")} />
        </button>
      ) : null}

      {visibleCountries.length === 0 ? (
        <div className="mt-3 rounded-md border border-white/10 bg-[#11191c] px-4 py-14 text-center">
          <p className="text-sm font-semibold text-white/72">No countries match your search.</p>
          <p className="mt-2 text-xs text-white/42">
            Clear the search or filters to restore the default country view.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            {search ? (
              <Button onClick={clearSearch} variant="outline" size="sm" className="rounded-full">
                Clear search
              </Button>
            ) : null}
            {hasActiveFilters ? (
              <Button onClick={clearFilters} variant="secondary" size="sm" className="rounded-full">
                Clear filters
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="hidden sm:block">
        <GlobalSoilTicker items={tickerItems} metadata={metadata} />
      </div>
    </section>
  );
}
