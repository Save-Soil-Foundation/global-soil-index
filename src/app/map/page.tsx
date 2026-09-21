import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers3, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Soil Health Map | Global Soil Index",
  description: "Explore spatial patterns in global soil health and resilience.",
};

const legend = [
  ["70-100", "Resilient", "#79bd45"],
  ["50-69", "Stable", "#d5bd59"],
  ["30-49", "Stressed", "#d8894c"],
  ["0-29", "Critical", "#d95757"],
];

export default function MapPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="flex flex-col gap-5 border-b border-white/10 pb-9 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="gsi-kicker">Spatial intelligence</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
            Global soil health map.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/48">
            See how soil condition changes across climate zones, ecosystems, and
            national borders.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-white/36">
          <span className="size-2 rounded-full bg-[#79bd45]" /> Prototype spatial layer
        </div>
      </header>

      <section className="mt-8 overflow-hidden border border-white/12 bg-[#091216]">
        <div className="relative aspect-[2.25/1] min-h-[330px]">
          <Image
            src="/assets/soil-map.jpg"
            alt="World map showing regional soil health conditions"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/15 bg-[#060c0f]/85 px-3 py-2 text-[10px] uppercase tracking-[0.08em] backdrop-blur sm:left-6 sm:top-6">
            <Layers3 size={14} className="text-[#79bd45]" /> Composite score layer
          </div>
        </div>

        <div className="grid border-t border-white/10 lg:grid-cols-[1fr_auto]">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {legend.map(([range, label, color], index) => (
              <div key={label} className={`flex items-center gap-3 px-4 py-4 ${index > 0 ? "border-l border-white/10" : ""}`}>
                <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
                <div>
                  <div className="text-[10px] font-semibold">{label}</div>
                  <div className="mt-0.5 text-[9px] text-white/30">{range}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center border-t border-white/10 px-5 py-4 lg:border-l lg:border-t-0">
            <Link href="/methodology" className="flex items-center gap-2 text-[10px] font-semibold uppercase text-[#98d75d]">
              How scores are calculated <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid border-y border-white/10 md:grid-cols-3">
        {[
          ["56.7", "Global average", "Composite prototype score"],
          ["Europe", "Leading region", "Highest current median"],
          ["Africa", "Priority region", "Largest restoration opportunity"],
        ].map(([value, label, detail], index) => (
          <article key={label} className={`px-5 py-6 ${index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}>
            <MapPin size={16} className="text-[#79bd45]" />
            <p className="mt-4 text-2xl font-light">{value}</p>
            <h2 className="mt-2 text-[10px] font-semibold uppercase tracking-[0.08em]">{label}</h2>
            <p className="mt-1 text-[10px] text-white/32">{detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
