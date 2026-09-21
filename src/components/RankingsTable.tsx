"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUpDown,
  ArrowUp,
  ChevronDown,
  Pause,
  Play,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { CountryRanking } from "@/data/countries";
import { getAllCountries } from "@/lib/soil-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const INITIAL_VISIBLE_COUNT = 20;
const MARKET_INTERVAL_MS = 2400;

type SortOption = "rank" | "score" | "change";
type Direction = "up" | "down" | "flat";

type LiveQuote = {
  score: number;
  tickChange: number;
  sessionChange: number;
  direction: Direction;
};

type QuoteMap = Record<string, LiveQuote>;
type MarketMoves = Record<string, Exclude<Direction, "flat">>;

function roundToTenth(value: number) {
  return Math.round(value * 10) / 10;
}

function createInitialQuotes(countries: CountryRanking[]): QuoteMap {
  return Object.fromEntries(
    countries.map((country) => [
      country.slug,
      {
        score: country.score,
        tickChange: 0,
        sessionChange: country.change1Y,
        direction: "flat" as const,
      },
    ])
  );
}

function scoreTone(score: number) {
  if (score >= 70) return "text-[#98d75d]";
  if (score >= 50) return "text-[#e4cc68]";
  if (score >= 35) return "text-[#dfa25f]";
  return "text-[#ef7770]";
}

export function RankingsTable() {
  const countries = getAllCountries();
  const regions = useMemo(
    () => Array.from(new Set(countries.map((country) => country.region))).sort(),
    [countries]
  );
  const baselineComposite = useMemo(
    () => countries.reduce((total, country) => total + country.score, 0) / countries.length,
    [countries]
  );

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All regions");
  const [policy, setPolicy] = useState("All policy levels");
  const [sortBy, setSortBy] = useState<SortOption>("rank");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [quotes, setQuotes] = useState<QuoteMap>(() => createInitialQuotes(countries));
  const [marketMoves, setMarketMoves] = useState<MarketMoves>({});
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (!isLive) return;

    let flashTimeout: number | undefined;

    const marketInterval = window.setInterval(() => {
      const movements = Object.fromEntries(
        countries.map((country) => {
          if (Math.random() < 0.28) return [country.slug, 0];

          const direction = Math.random() >= 0.5 ? 1 : -1;
          const magnitude = Math.random() > 0.78 ? 0.2 : 0.1;
          return [country.slug, direction * magnitude];
        })
      );

      const nextMoves: MarketMoves = {};

      setQuotes((currentQuotes) =>
        Object.fromEntries(
          countries.map((country) => {
            const current = currentQuotes[country.slug];
            const movement = movements[country.slug];
            const nextScore = roundToTenth(
              Math.min(100, Math.max(0, current.score + movement))
            );
            const tickChange = roundToTenth(nextScore - current.score);
            const direction: Direction =
              tickChange > 0 ? "up" : tickChange < 0 ? "down" : "flat";

            if (direction !== "flat") {
              nextMoves[country.slug] = direction;
            }

            return [
              country.slug,
              {
                score: nextScore,
                tickChange,
                sessionChange: roundToTenth(current.sessionChange + tickChange),
                direction,
              },
            ];
          })
        )
      );

      setMarketMoves(nextMoves);
      setLastUpdated(new Date());

      window.clearTimeout(flashTimeout);
      flashTimeout = window.setTimeout(() => setMarketMoves({}), 720);
    }, MARKET_INTERVAL_MS);

    return () => {
      window.clearInterval(marketInterval);
      window.clearTimeout(flashTimeout);
    };
  }, [countries, isLive]);

  const marketCountries = useMemo(
    () =>
      countries.map((country) => ({
        ...country,
        liveScore: quotes[country.slug]?.score ?? country.score,
        tickChange: quotes[country.slug]?.tickChange ?? 0,
        sessionChange: quotes[country.slug]?.sessionChange ?? country.change1Y,
        direction: quotes[country.slug]?.direction ?? ("flat" as const),
      })),
    [countries, quotes]
  );

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matching = marketCountries.filter((country) => {
      const matchesQuery =
        !query ||
        country.name.toLowerCase().includes(query) ||
        country.region.toLowerCase().includes(query);
      const matchesRegion = region === "All regions" || country.region === region;
      const matchesPolicy =
        policy === "All policy levels" || country.policyStatus === policy;

      return matchesQuery && matchesRegion && matchesPolicy;
    });

    return [...matching].sort((a, b) => {
      if (sortBy === "score") return b.liveScore - a.liveScore;
      if (sortBy === "change") return b.sessionChange - a.sessionChange;
      return a.rank - b.rank;
    });
  }, [marketCountries, policy, region, search, sortBy]);

  const visibleCountries = showAll
    ? filteredCountries
    : filteredCountries.slice(0, INITIAL_VISIBLE_COUNT);
  const activeFilterCount =
    Number(region !== "All regions") + Number(policy !== "All policy levels");

  const composite =
    marketCountries.reduce((total, country) => total + country.liveScore, 0) /
    marketCountries.length;
  const compositeChange = composite - baselineComposite;
  const compositePercent = (compositeChange / baselineComposite) * 100;
  const advancing = marketCountries.filter((country) => country.tickChange > 0).length;
  const declining = marketCountries.filter((country) => country.tickChange < 0).length;
  const compositeImproving = compositeChange >= 0;

  function clearFilters() {
    setRegion("All regions");
    setPolicy("All policy levels");
    setSearch("");
    setShowAll(false);
  }

  return (
    <TooltipProvider delayDuration={250}>
    <section id="rankings" className="scroll-mt-24">
      <div className="grid border border-white/12 bg-[#091216] md:grid-cols-[1.25fr_0.75fr_auto]">
        <div className="flex items-center gap-5 px-4 py-3 sm:px-5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#79bd45]/30 text-[#79bd45]">
            <Activity size={17} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/48">
                Global Soil Composite
              </span>
              <Badge className="min-h-5 px-2 py-0 text-[8px] text-white/38">
                Simulated feed
              </Badge>
            </div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-2xl font-light tabular-nums text-white">
                {composite.toFixed(2)}
              </span>
              <span
                className={`text-xs font-semibold tabular-nums ${
                  compositeImproving ? "text-[#79bd45]" : "text-[#ef5959]"
                }`}
              >
                {compositeImproving ? "+" : ""}
                {compositeChange.toFixed(2)} ({compositeImproving ? "+" : ""}
                {compositePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-white/10 md:border-l md:border-t-0">
          <div className="flex flex-col justify-center px-4 py-3">
            <span className="text-[9px] uppercase tracking-[0.08em] text-white/32">
              Market breadth
            </span>
            <span className="mt-1 text-xs font-semibold tabular-nums">
              <span className="text-[#79bd45]">{advancing} up</span>
              <span className="mx-2 text-white/18">/</span>
              <span className="text-[#ef5959]">{declining} down</span>
            </span>
          </div>
          <div className="flex flex-col justify-center border-l border-white/10 px-4 py-3">
            <span className="text-[9px] uppercase tracking-[0.08em] text-white/32">
              Tick interval
            </span>
            <span className="mt-1 text-xs font-semibold text-white/72">2.4 seconds</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 md:border-l md:border-t-0">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em]">
              <span
                className={`size-2 rounded-full ${isLive ? "animate-pulse bg-[#79bd45]" : "bg-[#dfa25f]"}`}
              />
              <span className={isLive ? "text-[#98d75d]" : "text-[#dfa25f]"}>
                {isLive ? "Market live" : "Market paused"}
              </span>
            </div>
            <div className="mt-1 text-[9px] tabular-nums text-white/30">
              {lastUpdated
                ? `Last tick ${lastUpdated.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}`
                : "Opening feed"}
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsLive((value) => !value)}
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                aria-label={isLive ? "Pause market updates" : "Resume market updates"}
              >
                {isLive ? <Pause size={14} /> : <Play size={14} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {isLive ? "Pause simulated feed" : "Resume simulated feed"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-y border-white/10 bg-[#081115] px-3 py-3 sm:px-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="success" className="shrink-0">
            {filteredCountries.length} countries
          </Badge>

          <div className="flex items-center">
            <Select
              value={sortBy}
              onValueChange={(value: SortOption) => {
                setSortBy(value);
                setShowAll(false);
              }}
            >
              <SelectTrigger
                className="h-10 w-[172px] overflow-hidden border-transparent bg-white/[0.045] text-xs font-medium text-white/78"
                aria-label="Sort countries"
              >
                <span className="flex min-w-0 items-center gap-2 whitespace-nowrap">
                  <ArrowUpDown size={14} className="shrink-0 text-[#79bd45]" />
                  <SelectValue />
                </span>
              </SelectTrigger>
              <SelectContent align="start">
                <SelectItem value="rank">World rank</SelectItem>
                <SelectItem value="score">Live score</SelectItem>
                <SelectItem value="change">Session change</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex min-w-0 w-full gap-2 lg:w-auto">
          <div className="relative min-w-0 flex-1 lg:w-[330px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/36" />
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setShowAll(false);
              }}
              placeholder="Search countries..."
              className="min-w-0 pl-10 pr-10"
              aria-label="Search countries"
            />
            {search ? (
              <Button
                onClick={() => setSearch("")}
                variant="ghost"
                size="icon-sm"
                className="absolute right-1.5 top-1/2 -translate-y-1/2"
                aria-label="Clear search"
              >
                <X size={15} />
              </Button>
            ) : null}
          </div>

          <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={filtersOpen || activeFilterCount ? "secondary" : "outline"}
                className="px-3 sm:px-4"
                aria-label="Filter countries"
              >
                <SlidersHorizontal size={16} />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#79bd45] text-[10px] font-bold text-[#071006]">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[min(92vw,410px)] overflow-hidden p-0">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">Filter countries</h2>
                  <p className="mt-1 text-xs leading-relaxed text-white/42">
                    Narrow the market by region or policy readiness.
                  </p>
                </div>
                {activeFilterCount > 0 && <Badge variant="success">{activeFilterCount} active</Badge>}
              </div>

              <div className="space-y-4 px-5 py-5">
                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase text-white/44">Region</span>
                  <Select
                    value={region}
                    onValueChange={(value) => {
                      setRegion(value);
                      setShowAll(false);
                    }}
                  >
                    <SelectTrigger aria-label="Filter by region">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All regions">All regions</SelectItem>
                      {regions.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase text-white/44">Policy readiness</span>
                  <Select
                    value={policy}
                    onValueChange={(value) => {
                      setPolicy(value);
                      setShowAll(false);
                    }}
                  >
                    <SelectTrigger aria-label="Filter by policy level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All policy levels">All policy levels</SelectItem>
                      <SelectItem value="Strong">Strong</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Weak">Weak</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </label>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/10 px-5 py-4">
                <Button
                  onClick={clearFilters}
                  disabled={!activeFilterCount && !search}
                  variant="ghost"
                  size="sm"
                >
                  <X size={14} /> Clear all
                </Button>
                <PopoverClose asChild>
                  <Button size="sm">View {filteredCountries.length} countries</Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Active filters">
          <span className="mr-1 text-[10px] font-semibold uppercase text-white/34">Active filters</span>
          {region !== "All regions" && (
            <button
              type="button"
              onClick={() => setRegion("All regions")}
              className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-[#79bd45]/25 bg-[#79bd45]/8 px-3 text-[11px] font-medium text-[#a9e275] transition hover:border-[#79bd45]/55"
            >
              {region} <X size={12} />
            </button>
          )}
          {policy !== "All policy levels" && (
            <button
              type="button"
              onClick={() => setPolicy("All policy levels")}
              className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-[#79bd45]/25 bg-[#79bd45]/8 px-3 text-[11px] font-medium text-[#a9e275] transition hover:border-[#79bd45]/55"
            >
              {policy} policy <X size={12} />
            </button>
          )}
        </div>
      )}

      <div className={`gsi-country-grid mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 ${showAll ? "" : "is-collapsed"}`}>
        {visibleCountries.map((country) => {
          const movement = marketMoves[country.slug];
          const improving = country.sessionChange >= 0;

          return (
            <article
              key={country.slug}
              className={`group flex min-h-[146px] flex-col items-center justify-center rounded-md border border-white/[0.07] bg-[#0d171b] px-2 py-3 text-center shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition hover:border-[#79bd45]/35 hover:bg-[#111e23] ${
                movement === "up" ? "gsi-quote-up" : movement === "down" ? "gsi-quote-down" : ""
              }`}
            >
              <span
                className="text-[40px] leading-none drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)]"
                aria-hidden="true"
              >
                {country.flag}
              </span>
              <div className="mt-2 text-sm font-medium text-[#8dca57]">
                {country.rank}
              </div>
              <h2 className="mt-0.5 line-clamp-1 text-xs font-semibold text-white">
                {country.name}
              </h2>
              <div className={`mt-1 text-xs font-medium tabular-nums ${scoreTone(country.liveScore)}`}>
                {country.liveScore.toFixed(1)}
              </div>
              <div
                className={`mt-1 flex items-center gap-0.5 text-[9px] font-semibold tabular-nums transition ${
                  improving ? "text-[#79bd45]" : "text-[#ef5959]"
                }`}
              >
                {improving ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                {Math.abs(country.sessionChange).toFixed(1)}
              </div>
            </article>
          );
        })}
      </div>

      {visibleCountries.length === 0 && (
        <div className="mt-3 rounded-md border border-white/10 bg-[#0b1519] px-4 py-16 text-center">
          <p className="text-sm font-semibold text-white/70">No countries match your filters.</p>
          <Button onClick={clearFilters} variant="secondary" size="sm" className="mt-4">
            Clear all filters
          </Button>
        </div>
      )}

      <div
        className="gsi-ticker-dock overflow-hidden rounded-md border border-white/15 bg-[#091216]/96 shadow-[0_20px_70px_rgba(0,0,0,0.62)] backdrop-blur-xl"
        role="region"
        aria-label="Live global soil market tape"
      >
        <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(121,189,69,0.75),transparent)]" />
        <div className="overflow-hidden">
          <div className={`gsi-ticker-track ${isLive ? "" : "is-paused"}`}>
            {[0, 1].map((trackIndex) => (
              <div
                key={trackIndex}
                className="gsi-ticker-segment"
                aria-hidden={trackIndex === 1}
              >
                {marketCountries.map((country) => {
                  const improving = country.sessionChange >= 0;

                  return (
                    <div
                      key={`${trackIndex}-${country.slug}`}
                      className={`flex h-14 min-w-[145px] items-center gap-2 border-r border-white/10 px-4 transition-colors ${
                        marketMoves[country.slug] === "up"
                          ? "bg-[#79bd45]/8"
                          : marketMoves[country.slug] === "down"
                            ? "bg-[#ef5959]/8"
                            : ""
                      }`}
                    >
                      <span className="text-lg" aria-hidden="true">{country.flag}</span>
                      <div className="min-w-0">
                        <div className="max-w-[88px] truncate whitespace-nowrap text-[10px] font-semibold text-white/82">
                          {country.name}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 whitespace-nowrap text-[10px] tabular-nums">
                          <span className="text-white/72">{country.liveScore.toFixed(1)}</span>
                          <span className={improving ? "text-[#79bd45]" : "text-[#ef5959]"}>
                            {improving ? "▲" : "▼"} {Math.abs(country.sessionChange).toFixed(1)}
                          </span>
                          <span className="text-white/28">#{country.rank}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {filteredCountries.length > INITIAL_VISIBLE_COUNT && (
        <Button
          onClick={() => setShowAll((value) => !value)}
          variant="outline"
          size="sm"
          className="mt-4 w-full text-[10px] uppercase"
        >
          {showAll ? `Show top ${INITIAL_VISIBLE_COUNT}` : `Show all ${filteredCountries.length} countries`}
          <ChevronDown size={13} className={showAll ? "rotate-180" : ""} />
        </Button>
      )}
    </section>
    </TooltipProvider>
  );
}
