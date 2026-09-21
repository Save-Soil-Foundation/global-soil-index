"use client";

import { ChevronRight } from "lucide-react";
import { useRef } from "react";
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

export function GlobalSoilTicker({ items, metadata }: GlobalSoilTickerProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollTicker() {
    scrollerRef.current?.scrollBy({
      left: 360,
      behavior: "smooth",
    });
  }

  return (
    <section
      className="mt-5 overflow-hidden rounded-md border border-white/[0.12] bg-[#11191c]"
      aria-label="Global soil ticker demonstration feed"
    >
      <div className="grid min-h-[96px] min-w-0 lg:grid-cols-[238px_minmax(0,1fr)_44px]">
        <div className="border-b border-white/10 px-5 py-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white">
              Global <span className="text-[#8cbf60]">Soil</span> Ticker
            </h2>
            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#9ccb68]">
              <span className="size-1.5 rounded-full bg-[#8cbf60]" />
              Demo
            </span>
          </div>
          <p className="mt-2 text-[10px] leading-4 text-white/40">
            Stable mock change vs yesterday. Not a verified live observation.
          </p>
        </div>

        <div
          ref={scrollerRef}
          className="flex min-w-0 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Ticker countries"
        >
          {items.map((item) => {
            const positive = (item.tickerChange ?? 0) >= 0;

            return (
              <article
                key={item.slug}
                className="flex min-w-[136px] items-center gap-2.5 border-r border-white/[0.08] px-3.5 py-3"
              >
                <CountryFlag country={item} width={30} height={20} />
                <div className="min-w-0">
                  <h3 className="truncate text-[10px] font-semibold text-white/88">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 whitespace-nowrap text-[9px] tabular-nums">
                    <span className="text-white/68">{formatScore(item.score)}</span>
                    <span className={positive ? "text-[#8cbf60]" : "text-[#e05d58]"}>
                      {formatChange(item.tickerChange)}
                    </span>
                    <span className="text-white/34">#{item.rank ?? "NA"}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={scrollTicker}
          className="flex min-h-11 items-center justify-center border-t border-white/10 text-white/54 transition hover:bg-white/[0.04] hover:text-[#9ccb68] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ccb68] lg:border-l lg:border-t-0"
          aria-label="Show more ticker countries"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <span className="sr-only">Dataset: {metadata.id}</span>
    </section>
  );
}
