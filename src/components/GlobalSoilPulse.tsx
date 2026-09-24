import { ArrowDown, ArrowUp } from "lucide-react";
import { useId } from "react";
import type { CountryRanking, DatasetMetadata } from "@/lib/soil-types";

export function GlobalSoilPulse({ rankings, metadata }: {
  rankings: CountryRanking[];
  metadata: DatasetMetadata;
}) {
  const chartId = useId().replace(/:/g, "");
  const scored = rankings.filter((country) => country.score !== null && Number.isFinite(country.score));
  const average = scored.length
    ? scored.reduce((sum, country) => sum + country.score!, 0) / scored.length
    : null;
  const highest = scored.reduce<CountryRanking | null>((best, country) =>
    best === null || country.score! > best.score! ? country : best, null);
  const withChange = rankings.filter((country) =>
    country.historicalChange !== null && Number.isFinite(country.historicalChange));
  const improving = withChange.filter((country) => country.historicalChange! > 0).length;
  const declining = withChange.filter((country) => country.historicalChange! < 0).length;
  const metrics = [
    { label: "Average GSI", value: average?.toFixed(1) ?? "N/A", detail: "Global Average", color: "text-white" },
    { label: "Highest", value: highest?.score?.toFixed(1) ?? "N/A", detail: highest?.name ?? "No scores available", color: "text-white" },
    { label: "Improving", value: withChange.length ? String(improving) : "N/A", detail: "Countries", color: "text-[#8cbf60]" },
    { label: "Declining", value: withChange.length ? String(declining) : "N/A", detail: "Countries", color: "text-[#e05d58]" },
  ];

  // Illustrative shape only: the provider does not supply daily global history.
  const previewLine = "M4 76 L11 72 L17 73 L24 65 L30 68 L37 57 L43 59 L50 69 L56 72 L62 55 L69 25 L73 22 L79 56 L85 62 L90 58 L97 73 L103 55 L109 39 L115 47 L121 53 L128 34 L135 12 L140 16 L146 43 L152 51 L158 47 L164 53 L174 49";

  return (
    <aside aria-label="Global Soil Pulse" className="min-w-0 rounded-2xl border border-[#9baa85]/25 bg-[#071116]/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b border-white/[0.08] pb-2">
        <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.035em] text-white/85">
          <span aria-hidden="true" className="size-2 rounded-full bg-[#a3d64a] shadow-[0_0_10px_#a3d64a80]" />
          <span className="mr-1 text-[#a3d64a]">{metadata.provider === "mock" ? "Demo" : "Dataset"}</span>
          Global Soil Pulse
        </h2>
        <span className="text-[10px] text-white/50">Updated: {metadata.updateLabel}</span>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-y-3 py-2.5 sm:grid-cols-[minmax(0,4fr)_minmax(100px,1.1fr)]">
        <dl className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="min-w-0 border-r border-white/[0.08] px-3 first:pl-0" title={index === 0 ? `Unweighted mean of ${scored.length} available scores` : index > 1 ? `Based on historical change; ${withChange.length} countries have data. Zero changes are excluded.` : undefined}>
              <dt className="text-[10px] font-semibold uppercase leading-tight text-white/65">{metric.label}</dt>
              <dd className={`mt-2 flex items-center gap-1.5 text-[26px] font-semibold leading-none tracking-tight tabular-nums xl:text-[30px] ${metric.color}`}>
                {metric.value}
                {index === 2 && <ArrowUp aria-hidden="true" className="size-4 shrink-0" strokeWidth={3} />}
                {index === 3 && <ArrowDown aria-hidden="true" className="size-4 shrink-0" strokeWidth={3} />}
              </dd>
              <dd className="mt-2 truncate text-[11px] text-white/55" title={metric.detail}>{metric.detail}</dd>
            </div>
          ))}
        </dl>
        <figure className="min-w-0 px-2 sm:pl-4 sm:pr-0" aria-label="Illustrative seven-day sparkline preview, not measured data">
          <svg viewBox="0 0 180 100" className="mx-auto h-[60px] w-full max-w-[220px] overflow-visible" role="img" aria-label="Preview trend line">
            <defs>
              <linearGradient id={`${chartId}-fill`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a3ce48" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#a3ce48" stopOpacity="0" />
              </linearGradient>
              <filter id={`${chartId}-glow`} x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="2" /></filter>
            </defs>
            {[12, 36, 60, 84].map((y) => <path key={`h${y}`} d={`M0 ${y} H180`} stroke="white" strokeOpacity="0.06" strokeDasharray="2 3" />)}
            {[12, 48, 84, 120, 156].map((x) => <path key={`v${x}`} d={`M${x} 0 V100`} stroke="white" strokeOpacity="0.06" strokeDasharray="2 3" />)}
            <path d={`${previewLine} L174 100 L4 100 Z`} fill={`url(#${chartId}-fill)`} />
            <path d={previewLine} fill="none" stroke="#a3ce48" strokeWidth="4" opacity="0.35" filter={`url(#${chartId}-glow)`} />
            <path d={previewLine} fill="none" stroke="#a3ce48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <figcaption className="mt-1 text-center text-[10px] text-white/55">Last 7 days · Preview</figcaption>
        </figure>
      </div>
      <p className="text-[9px] leading-relaxed text-white/40">
        {metadata.provider === "mock" ? "Prototype scores · " : ""}Historical trend counts · Chart illustrative, not live measurements
      </p>
    </aside>
  );
}
