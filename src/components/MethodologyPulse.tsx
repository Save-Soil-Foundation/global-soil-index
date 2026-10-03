import { useId } from "react";

const metrics = [
  { label: "Framework", value: "9", detail: "Indicators", color: "text-white" },
  { label: "Earth observation", value: "6", detail: "Observation layers", color: "text-[#8cbf60]" },
  { label: "Field validation", value: "9", detail: "Metrics require it", color: "text-white" },
  { label: "Action layer", value: "1", detail: "Policy readiness", color: "text-[#d7be61]" },
];

export function MethodologyPulse() {
  const chartId = useId().replace(/:/g, "");
  const observationLine = "M4 76 L20 65 L36 56 L52 64 L68 43 L84 48 L100 29 L116 41 L132 18 L148 31 L164 24 L176 34";

  return (
    <aside aria-label="Methodology Pulse" className="min-w-0 rounded-2xl border border-[#9baa85]/25 bg-[#071116]/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b border-white/[0.08] pb-2">
        <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.035em] text-white/85">
          <span aria-hidden="true" className="size-2 rounded-full bg-[#a3d64a] shadow-[0_0_10px_#a3d64a80]" />
          <span className="mr-1 text-[#a3d64a]">Framework</span>
          Methodology Pulse
        </h2>
        <span className="text-[10px] text-white/50">Earth observation + field validation</span>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-y-3 py-2.5 sm:grid-cols-[minmax(0,4fr)_minmax(100px,1.1fr)]">
        <dl className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="min-w-0 border-r border-white/[0.08] px-3 first:pl-0">
              <dt className="text-[10px] font-semibold uppercase leading-tight text-white/65">{metric.label}</dt>
              <dd className={`mt-2 text-[26px] font-semibold leading-none tracking-tight tabular-nums xl:text-[30px] ${metric.color}`}>{metric.value}</dd>
              <dd className="mt-2 truncate text-[11px] text-white/55">{metric.detail}</dd>
            </div>
          ))}
        </dl>
        <figure className="min-w-0 px-2 sm:pl-4 sm:pr-0" aria-label="Illustrative observation and validation pathway">
          <svg viewBox="0 0 180 100" className="mx-auto h-[60px] w-full max-w-[220px] overflow-visible" role="img" aria-label="Earth observation and field validation pathway">
            <defs>
              <linearGradient id={`${chartId}-fill`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a3ce48" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#a3ce48" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[12, 36, 60, 84].map((y) => <path key={`h${y}`} d={`M0 ${y} H180`} stroke="white" strokeOpacity="0.06" strokeDasharray="2 3" />)}
            {[12, 48, 84, 120, 156].map((x) => <path key={`v${x}`} d={`M${x} 0 V100`} stroke="white" strokeOpacity="0.06" strokeDasharray="2 3" />)}
            <path d={`${observationLine} L176 100 L4 100 Z`} fill={`url(#${chartId}-fill)`} />
            <path d={observationLine} fill="none" stroke="#a3ce48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <figcaption className="mt-1 text-center text-[10px] text-white/55">Data-fusion pathway</figcaption>
        </figure>
      </div>
      <p className="text-[9px] leading-relaxed text-white/40">Satellite observations scale monitoring; field measurements calibrate and validate country-level interpretation.</p>
    </aside>
  );
}
