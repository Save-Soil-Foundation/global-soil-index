"use client";

import { Satellite } from "lucide-react";
import { useState } from "react";
import type { SoilIndicatorDefinition } from "@/lib/soil-types";

export function MethodologyIndicatorGrid({ indicators }: { indicators: SoilIndicatorDefinition[] }) {
  const [satelliteLens, setSatelliteLens] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="gsi-kicker">Indicator definitions</p>
          <h2 className="mt-2 text-2xl font-light uppercase">Proposed scoring inputs</h2>
        </div>
        <div className="flex items-center gap-3">
          {satelliteLens ? <span className="text-[9px] font-semibold uppercase tracking-[0.05em] text-[#b8df8a]">Earth observation notes visible</span> : null}
          <button
            type="button"
            onClick={() => setSatelliteLens((visible) => !visible)}
            aria-pressed={satelliteLens}
            className={`inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[9px] font-semibold uppercase tracking-[0.05em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbf60] ${satelliteLens ? "border-[#8cbf60]/55 bg-[#8cbf60]/12 text-[#b8df8a]" : "border-white/14 bg-white/[0.03] text-white/48 hover:border-white/28 hover:text-white/72"}`}
          >
            <Satellite size={11} />
            Satellite lens
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {indicators.map((indicator, index) => (
          <article
            key={indicator.id}
            className="gsi-hover-lift rounded-md border border-white/[0.08] bg-[#141d21] p-5"
          >
            <span className="text-[10px] font-semibold text-[#8cbf60]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.04em]">
              {indicator.label}
            </h3>
            <p className="mt-2 text-xs leading-5 text-white/42">{indicator.description}</p>
            {satelliteLens && indicator.hyperspectralRole ? (
              <p className="mt-3 border-l border-[#8cbf60]/45 pl-2 text-[10px] leading-4 text-[#b8df8a]/85">
                <span className="font-semibold uppercase tracking-[0.06em]">Hyperspectral role · </span>
                {indicator.hyperspectralRole}
              </p>
            ) : null}
            <p className="mt-4 text-[10px] uppercase tracking-[0.06em] text-white/30">
              {indicator.sourceType}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
