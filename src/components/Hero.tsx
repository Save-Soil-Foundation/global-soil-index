import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  CalendarDays,
  Database,
  Globe2,
  ShieldCheck,
} from "lucide-react";

const metrics = [
  { label: "Countries tracked", value: "196", Icon: Globe2 },
  { label: "Core indicators", value: "9", Icon: Database },
  { label: "Data edition", value: "2026", Icon: CalendarDays },
];

export function Hero() {
  return (
    <header id="overview" className="relative min-h-[370px] scroll-mt-20 overflow-hidden rounded-lg bg-[#10241c] text-white">
      <Image
        src="/assets/earth-hero.jpg"
        alt="Earth viewed from orbit with illuminated land patterns"
        fill
        priority
        sizes="(min-width: 1024px) 80vw, 100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,25,19,0.96)_0%,rgba(8,25,19,0.78)_48%,rgba(8,25,19,0.18)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,rgba(8,25,19,0.88),transparent)]" />

      <div className="relative z-10 flex min-h-[370px] flex-col justify-between p-5 sm:p-7 lg:p-9">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/15 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-sm">
            <ShieldCheck size={14} className="text-[#b7e43b]" />
            Independent global soil intelligence
          </div>

          <h1 className="gsi-display max-w-3xl text-[2.65rem] leading-[0.92] sm:text-6xl lg:text-7xl">
            The health of our soil,
            <span className="block text-[#b7e43b]">made measurable.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-white/76 sm:text-base">
            A transparent benchmark for comparing soil health, resilience, and
            policy action across the world.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#rankings"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#b7e43b] px-4 text-sm font-bold text-[#10241c] transition hover:bg-[#c9ef62]"
            >
              Explore rankings <ArrowDown size={16} />
            </Link>
            <Link
              href="#methodology"
              className="inline-flex min-h-11 items-center rounded-md border border-white/30 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              How the index works
            </Link>
          </div>
        </div>

        <div className="mt-10 grid max-w-2xl grid-cols-3 border-t border-white/20 pt-5">
          {metrics.map(({ label, value, Icon }, index) => (
            <div
              key={label}
              className={`flex items-center gap-3 ${index > 0 ? "border-l border-white/15 pl-4 sm:pl-6" : ""}`}
            >
              <Icon className="hidden text-[#b7e43b] sm:block" size={20} />
              <div>
                <div className="text-xl font-extrabold sm:text-2xl">{value}</div>
                <div className="mt-0.5 text-[10px] leading-tight text-white/60 sm:text-xs">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
