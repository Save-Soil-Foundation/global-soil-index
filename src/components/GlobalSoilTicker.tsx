"use client";

import { ChevronRight } from "lucide-react";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { CountryFlag } from "@/components/CountryFlag";
import type { DatasetMetadata, SoilTickerItem } from "@/lib/soil-types";

type GlobalSoilTickerProps = {
  items: SoilTickerItem[];
  metadata: DatasetMetadata;
};

function formatScore(score: number | null) {
  return score === null ? "N/A" : score.toFixed(1);
}

function formatChange(change: number | null) {
  if (change === null) return "N/A";
  return `${change > 0 ? "+" : ""}${change.toFixed(1)}`;
}

function TickerItem({
  item,
  hiddenFromAssistiveTech = false,
}: {
  item: SoilTickerItem;
  hiddenFromAssistiveTech?: boolean;
}) {
  const positive = (item.tickerChange ?? 0) >= 0;

  return (
    <article
      aria-hidden={hiddenFromAssistiveTech}
      className="flex min-w-0 snap-start items-center gap-2 border-r border-white/[0.08] px-2.5 py-2 sm:gap-2.5 sm:px-3"
    >
      <CountryFlag country={item} width={26} height={17} />
      <div className="min-w-0">
        <h3 className="truncate text-[10px] font-semibold text-white/88">{item.name}</h3>
        <div className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[9px] tabular-nums sm:gap-2">
          <span className="text-white/68">{formatScore(item.score)}</span>
          <span className={positive ? "text-[#8cbf60]" : "text-[#e05d58]"}>
            {formatChange(item.tickerChange)}
          </span>
          <span className="text-white/34">#{item.rank ?? "NA"}</span>
        </div>
      </div>
    </article>
  );
}

export function GlobalSoilTicker({ items, metadata }: GlobalSoilTickerProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const animationDuration = `${Math.max(0.5, items.length * 0.04)}s`;

  function scrollTicker() {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    setManuallyPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => setManuallyPaused(false), 4200);

    scrollerRef.current?.scrollBy({
      left: Math.max(180, Math.round(scroller.clientWidth * 0.75)),
      behavior: "smooth",
    });
  }

  return (
    <section
      className="gsi-animate-panel mt-4 overflow-hidden rounded-md border border-white/[0.12] bg-[#11191c]"
      aria-label="Global soil ticker feed"
    >
      <div className="grid min-h-[76px] min-w-0 grid-cols-[minmax(0,1fr)_42px] lg:grid-cols-[238px_minmax(0,1fr)_40px]">
        <div className="col-span-2 border-b border-white/10 px-4 py-2.5 sm:px-5 sm:py-3 lg:col-span-1 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white">
              Global <span className="text-[#8cbf60]">Soil</span> Ticker
            </h2>
          </div>
          <p className="mt-1.5 text-[10px] leading-4 text-white/40">
            Stable index change vs yesterday. Not a verified live observation.
          </p>
        </div>

        <div
          ref={scrollerRef}
          className="group/ticker gsi-ticker-viewport flex min-w-0 items-stretch overflow-x-auto overflow-y-hidden"
          tabIndex={0}
          aria-label="Ticker countries"
        >
          <div
            className={`gsi-ticker-track grid min-h-12 items-stretch grid-flow-col auto-cols-[clamp(128px,46vw,168px)] sm:auto-cols-[148px] ${
              manuallyPaused ? "gsi-ticker-paused" : ""
            }`}
            style={{ "--gsi-ticker-duration": animationDuration } as CSSProperties}
          >
            {items.map((item) => (
              <TickerItem key={item.slug} item={item} />
            ))}
            {items.map((item) => (
              <TickerItem
                key={`${item.slug}-loop`}
                item={item}
                hiddenFromAssistiveTech
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollTicker}
          className="gsi-pulse-ring flex min-h-12 items-center justify-center border-l border-white/10 text-white/54 transition hover:bg-white/[0.04] hover:text-[#9ccb68] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ccb68] lg:min-h-10"
          aria-label="Show more ticker countries"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <span className="sr-only">Dataset: {metadata.id}</span>
    </section>
  );
}
