import type { ReactNode } from "react";

type PageEarthStripProps = {
  eyebrow: string;
  title: string;
  description: string;
  panelLabel: string;
  panelItems: Array<[string, string]>;
  panel?: ReactNode;
  children?: ReactNode;
};

export function PageEarthStrip({
  eyebrow,
  title,
  description,
  panelLabel,
  panelItems,
  panel,
  children,
}: PageEarthStripProps) {
  return (
    <header className="gsi-animate-panel relative isolate -mx-5 -mt-5 bg-[#091216] sm:-mx-8 lg:-mx-[34px] lg:-mt-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-left-top brightness-110"
        style={{ backgroundImage: "url('/assets/earth-hero-left.png')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,#060d10_0%,transparent_35%),linear-gradient(90deg,rgba(6,13,16,0.85)_0%,rgba(6,13,16,0.3)_45%,rgba(6,13,16,0.05)_100%)]"
      />
      <div className="grid items-center gap-4 px-5 py-4 sm:px-8 sm:py-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-8 lg:px-[34px] lg:py-5">
        <div className="min-w-0">
          <p className="gsi-kicker">{eyebrow}</p>
          <h1 className="gsi-display mt-2 text-[24px] leading-[1.08] text-white min-[380px]:text-[26px] sm:text-[30px] lg:text-[31px] xl:text-[33px]">
            {title}
          </h1>
          <p className="mt-1 text-[13px] text-white/58 sm:mt-1.5 sm:text-sm">{description}</p>
          {children}
        </div>

        {panel ? <div className="hidden lg:block">{panel}</div> : <aside className="hidden w-full rounded-xl border border-white/15 bg-[#071014]/80 p-4 shadow-[0_14px_45px_rgba(0,0,0,0.24)] backdrop-blur-sm lg:block">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[10px] font-semibold uppercase tracking-wide text-white/72">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#9ad75c] shadow-[0_0_12px_rgba(154,215,92,0.9)]" />
              {panelLabel}
            </span>
            <span className="text-[#9ad75c]">Soil Index</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {panelItems.map(([label, value]) => (
              <div key={label} className="border-l border-white/10 pl-3 first:border-l-0 first:pl-0">
                <p className="text-[10px] font-semibold uppercase text-white/42">{label}</p>
                <p className="mt-1 text-sm font-semibold uppercase text-white">{value}</p>
              </div>
            ))}
          </div>
        </aside>}
      </div>
    </header>
  );
}
