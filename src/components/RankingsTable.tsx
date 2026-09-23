"use client";

import { Filter, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CountryRankCard } from "@/components/CountryRankCard";
import { GlobalSoilTicker } from "@/components/GlobalSoilTicker";
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

type SortOption = "rank" | "score" | "name" | "historical-change";
type ScoreRange = "all" | "70-plus" | "50-69" | "30-49" | "0-29";
type RankRange = "all" | "1-20" | "1-50" | "51-100" | "101-196";
type AvailabilityFilter = "all" | DataAvailability;

type RankingsTableProps = {
  rankings: CountryRanking[];
  metadata: DatasetMetadata;
  tickerItems: SoilTickerItem[];
};

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
  const defaultVisualMode = !query && activeFilterCount === 0 && sortBy === "rank";

  const visibleCountries = useMemo(() => {
    const filtered = rankings.filter((country) => {
      const matchesQuery = !query || country.name.toLowerCase().includes(query);
      const matchesRegion = region === "all" || country.region === region;
      const matchesScore = scoreInRange(country.score, scoreRange);
      const matchesRank = rankInRange(country.rank, rankRange);
      const matchesAvailability =
        availability === "all" || country.dataAvailability === availability;

      return (
        matchesQuery &&
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
    availability,
    defaultVisualMode,
    query,
    rankRange,
    rankings,
    region,
    scoreRange,
    sortBy,
  ]);

  function clearSearch() {
    setSearch("");
  }

  function clearFilters() {
    setRegion("all");
    setScoreRange("all");
    setRankRange("all");
    setAvailability("all");
  }

  return (
    <section id="rankings" className="gsi-animate-page scroll-mt-28">
      <div className="gsi-animate-panel flex flex-col gap-3.5 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h1 className="gsi-display text-[24px] leading-[1.08] text-white min-[380px]:text-[26px] sm:text-[30px] lg:whitespace-nowrap lg:text-[31px] xl:text-[33px]">
            Explore{" "}
            <span className="text-[#8cbf60]">the world&apos;s soil health</span>
          </h1>
          <p className="mt-1 text-[13px] text-white/48 sm:mt-1.5 sm:text-sm">
            196 Countries. 1 Global Index.
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
                  disabled={activeFilterCount === 0}
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

      <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-4 sm:gap-5">
        <div className="text-[12px] font-bold uppercase tracking-[0.05em] text-[#8cbf60]">
          {metadata.countryCount} Countries
        </div>

        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger
            className="h-auto w-auto gap-1 border-0 bg-transparent p-0 text-[12px] font-semibold uppercase tracking-[0.05em] text-white/44 shadow-none hover:text-white/70 focus:ring-0"
            aria-label="Sort countries"
          >
            <span className="text-white/42">Sort by:</span>
            <span className="text-[#8cbf60]">{sortLabels[sortBy]}</span>
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="rank">{sortLabels.rank}</SelectItem>
            <SelectItem value="score">{sortLabels.score}</SelectItem>
            <SelectItem value="name">{sortLabels.name}</SelectItem>
            <SelectItem value="historical-change">{sortLabels["historical-change"]}</SelectItem>
          </SelectContent>
        </Select>

        {!defaultVisualMode ? (
          <p className="text-[11px] text-white/34" aria-live="polite">
            Showing {visibleCountries.length} matching countries
          </p>
        ) : null}
      </div>

      <div className="sm:hidden">
        <GlobalSoilTicker items={tickerItems} metadata={metadata} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-[7px] min-[520px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10">
        {visibleCountries.map((country, index) => (
          <CountryRankCard key={country.slug} country={country} index={index} />
        ))}
      </div>

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
            {activeFilterCount > 0 ? (
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
