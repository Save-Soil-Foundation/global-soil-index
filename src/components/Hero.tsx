import Image from "next/image";
import {
  Calendar,
  Download,
  Leaf,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";

const trustItems = [
  ["Transparent", "Open data & methodology", ShieldCheck],
  ["Independent", "Science-based assessment", Users],
  ["Accountable", "Holding leaders to account", Leaf],
  ["Volunteer-Driven", "Powered by people", Users],
];

export function Hero() {
  return (
    <header className="relative overflow-hidden rounded-xl border gsi-border">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/earth-hero.jpg"
          alt="Global soil earth visualization"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#031426]/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:justify-between xl:gsi-card-padding">
        <div>
          <h1 className="gsi-wordmark text-4xl leading-[0.9] sm:text-5xl xl:gsi-hero-title">
            Global{" "}
            <span className="text-lime-400 tracking-[4px]">
              Soil
            </span>{" "}
            Index
          </h1>

          <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg xl:text-base">
            Ranking 196 countries by soil health, sustainability, and policy action.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:mt-5 xl:grid-cols-4 xl:gap-3">
            {trustItems.map(([title, desc, Icon]) => {
              const IconComponent = Icon as typeof ShieldCheck;

              return (
                <div key={title as string} className="flex gap-3">
                  <IconComponent
                    className="shrink-0 text-lime-400"
                    size={20}
                  />
                  <div>
                    <div className="text-sm font-bold">
                      {title as string}
                    </div>
                    <div className="text-xs text-white/65">
                      {desc as string}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 lg:shrink-0">
          <button className="flex h-9 cursor-pointer items-center gap-2 rounded-md border gsi-border px-3 text-xs transition hover:bg-white/5">
            <Calendar size={15} /> 2026
          </button>

          <button className="flex h-9 cursor-pointer items-center gap-2 rounded-md border gsi-border px-3 text-xs transition hover:bg-white/5">
            <Share2 size={15} /> Share
          </button>

          <button className="flex h-9 cursor-pointer items-center gap-2 rounded-md bg-lime-400 px-3 text-xs font-bold text-black transition hover:bg-lime-300">
            <Download size={15} /> Download Report
          </button>
        </div>
      </div>
    </header>
  );
}