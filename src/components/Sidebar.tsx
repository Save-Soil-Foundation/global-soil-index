"use client";

import Image from "next/image";
import {
  BarChart3,
  BookOpen,
  Globe2,
  Info,
  Map,
  Menu,
  Sprout,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  ["Country Rankings", Globe2],
  ["Compare Countries", BarChart3],
  ["Soil Health Map", Map],
  ["Indicators", BarChart3],
  ["Trends", BarChart3],
  ["Policy Tracker", BookOpen],
  ["Methodology", BookOpen],
  ["Resources", BookOpen],
  ["Reports", BookOpen],
  ["About GSI", Info],
];

function SidebarContent() {
  return (
    <>
      <div className="flex items-center gap-3">
        <Image
          src="/assets/save-soil-logo.png"
          alt="Save Soil Movement"
          width={70}
          height={70}
          className="h-auto shrink-0"
        />

        <div>
          <div className="text-[11px] font-bold uppercase leading-tight">
            A Volunteer-Driven
          </div>
          <div className="text-[11px] font-bold uppercase leading-tight">
            Global Initiative
          </div>
          <div className="mt-1 text-[10px] text-lime-300">
            ● Open. Transparent. For All.
          </div>
        </div>
      </div>

      <nav className="mt-7 space-y-1.5 text-[13px]">
        {navItems.map(([label, Icon], index) => {
          const IconComponent = Icon as typeof Globe2;

          return (
            <div
              key={label as string}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition ${
                index === 0
                  ? "border-l-4 border-lime-400 bg-lime-400/10 text-lime-300"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              <IconComponent size={16} />
              {label as string}
            </div>
          );
        })}
      </nav>

      <div className="gsi-card mt-7 p-4 text-center">
        <Sprout className="mx-auto text-lime-300" size={38} />

        <h3 className="mt-3 text-base font-bold">
          Healthy Soil. Secure Future.
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-white/70">
          Restore soil health for people and the planet.
        </p>

        <button className="mt-4 w-full cursor-pointer rounded-md border border-lime-400 py-2 text-xs text-lime-300 transition hover:bg-lime-400/10">
          Learn More →
        </button>
      </div>
    </>
  );
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b gsi-border bg-[#031426]/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/save-soil-logo.png"
            alt="Save Soil Movement"
            width={38}
            height={38}
            className="h-auto"
          />

          <div>
            <div className="text-sm font-bold">Global Soil Index</div>
            <div className="text-xs text-lime-300">Ranking 196 Countries</div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer rounded-md border gsi-border p-2 transition hover:bg-white/5"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 cursor-pointer bg-black/60"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu overlay"
          />

          <aside className="relative h-full w-[300px] overflow-y-auto bg-[#031426] p-5">
            <button
              onClick={() => setIsOpen(false)}
              className="mb-5 ml-auto flex cursor-pointer rounded-md border gsi-border p-2 transition hover:bg-white/5"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>

            <SidebarContent />
          </aside>
        </div>
      )}

      <aside className="hidden w-[250px] shrink-0 bg-[#031426] p-5 lg:block">
        <SidebarContent />
      </aside>
    </>
  );
}