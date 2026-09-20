"use client";

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
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Overview", href: "#overview", Icon: BarChart3 },
  { label: "Country rankings", href: "#rankings", Icon: Globe2 },
  { label: "Soil health map", href: "#health-map", Icon: Map },
  { label: "Methodology", href: "#methodology", Icon: BookOpen },
  { label: "About the index", href: "#about", Icon: Info },
];

function Brand() {
  return (
    <Link href="#overview" className="flex items-center gap-3" aria-label="Global Soil Index home">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#b7e43b] text-[#10241c]">
        <Sprout size={23} strokeWidth={2.2} />
      </div>
      <div>
        <div className="gsi-display text-[17px] leading-none text-white">
          Global Soil Index
        </div>
        <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45">
          Independent benchmark
        </div>
      </div>
    </Link>
  );
}
function SidebarContent({ close }: { close?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Brand />

      <nav className="mt-10 space-y-1" aria-label="Primary navigation">
        {navItems.map(({ label, href, Icon }, index) => (
          <Link
            key={label}
            href={href}
            onClick={close}
            className={`group flex min-h-11 items-center gap-3 rounded-md px-3 text-[13px] font-medium transition ${
              index === 0
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/6 hover:text-white"
            }`}
          >
            <Icon
              size={17}
              className={index === 0 ? "text-[#b7e43b]" : "text-white/45 group-hover:text-[#b7e43b]"}
            />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
          <span className="size-2 rounded-full bg-[#b7e43b]" />
          2026 prototype edition
        </div>
        <p className="mt-2 text-[11px] leading-5 text-white/42">
          Open methodology. Transparent sources. Built for accountability.
        </p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-black/10 bg-[#10241c]/96 px-4 backdrop-blur lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex size-10 items-center justify-center rounded-md border border-white/15 text-white"
          aria-label="Open navigation"
          aria-expanded={isOpen}
        >
          <Menu size={20} />
        </button>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
          />
          <aside className="relative h-full w-[min(310px,86vw)] bg-[#10241c] p-5 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-md border border-white/15 text-white"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
            <SidebarContent close={() => setIsOpen(false)} />
          </aside>
        </div>
      )}

      <aside className="sticky top-0 hidden h-screen w-[238px] shrink-0 bg-[#10241c] p-5 lg:block">
        <SidebarContent />
      </aside>
    </>
  );
}
