import { getPartnershipSummary } from "@/lib/partnerships";
import { useId } from "react";

export function PartnershipPulse() {
  const chartId = useId().replace(/:/g, "");
  const summary = getPartnershipSummary();
  const maxCount = Math.max(1, ...summary.trackCounts.map((track) => track.count));
  const points = summary.trackCounts.map((track, index) => {
    const x = 8 + index * 54;
    const y = 76 - (track.count / maxCount) * 50;
    return `${x},${y}`;
  });

  return (
    <aside className="min-w-0 rounded-2xl border border-[#9baa85]/25 bg-[#071116]/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b border-white/[0.08] pb-2">
        <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.035em] text-white/85">
          <span className="size-2 rounded-full bg-[#9ad75c] shadow-[0_0_12px_rgba(154,215,92,0.9)]" />
          <span className="mr-1 text-[#9ad75c]">Live</span>
          Partnership pulse
        </h2>
        <span className="text-[10px] text-white/50">Updated as partners are confirmed</span>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-y-3 py-2.5 sm:grid-cols-[minmax(0,4fr)_minmax(100px,1.1fr)]">
        <dl className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
          {[
            ["Confirmed", summary.confirmedOrganizationCount, "Organizations"],
            ["Active", summary.activeTrackCount, "Tracks"],
            ["Awaiting", summary.awaitingTrackCount, "Tracks"],
            ["Logo assets", summary.logoCount, "Registered"],
          ].map(([label, value, detail]) => (
            <div key={label as string} className="min-w-0 border-r border-white/[0.08] px-3 first:pl-0">
              <dt className="text-[10px] font-semibold uppercase leading-tight text-white/65">{label}</dt>
              <dd className="mt-2 text-[26px] font-semibold leading-none tracking-tight tabular-nums text-white xl:text-[30px]">{value}</dd>
              <dd className="mt-2 truncate text-[11px] text-white/55">{detail}</dd>
            </div>
          ))}
        </dl>
        <figure className="min-w-0 px-2 sm:pl-4 sm:pr-0" aria-label="Confirmed organizations by partnership track">
          <svg viewBox="0 0 180 100" className="mx-auto h-[60px] w-full max-w-[220px] overflow-visible" role="img" aria-label="Partnership coverage by track">
            <defs>
              <linearGradient id={`${chartId}-fill`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a3ce48" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#a3ce48" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[12, 36, 60, 84].map((y) => <path key={`h${y}`} d={`M0 ${y} H180`} stroke="white" strokeOpacity="0.06" strokeDasharray="2 3" />)}
            {[12, 48, 84, 120, 156].map((x) => <path key={`v${x}`} d={`M${x} 0 V100`} stroke="white" strokeOpacity="0.06" strokeDasharray="2 3" />)}
            <path d={`M${points.join(" L")} L170 100 L8 100 Z`} fill={`url(#${chartId}-fill)`} />
            <path d={`M${points.join(" L")}`} fill="none" stroke="#a3ce48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <figcaption className="mt-1 text-center text-[10px] text-white/55">Coverage by track</figcaption>
        </figure>
      </div>
      <p className="text-[9px] leading-relaxed text-white/40">Counts update from the registered partner organization list and approved logo assets.</p>
    </aside>
  );
}
