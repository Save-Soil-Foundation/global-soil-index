"use client";

import { Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { datasetMetadata } from "@/data/countries";

const footerLinks = [
  { label: "Rankings", href: "/" },
  { label: "Methodology", href: "/methodology" },
  { label: "Insights", href: "/insights" },
  { label: "Blog", href: "/blog" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Soil map", href: "/map" },
  { label: "About", href: "/about" },
];

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <footer className="px-5 pb-3 pt-1 sm:px-8 lg:px-[34px]">
        <div className="flex flex-col items-center gap-2 text-center text-[10px] leading-4 text-[#8a8071] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="max-w-[28ch] sm:max-w-none">
            Soil is one of humanity&apos;s most valuable assets. Take care of it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-white/36 sm:justify-end">
            <span>Updated: {datasetMetadata.updateLabel}</span>
            <span className="flex items-center gap-1.5 uppercase text-[#8cbf60]">
              <span className="size-1.5 rounded-full bg-[#8cbf60]" />
              {datasetMetadata.statusLabel}
            </span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Leaf size={18} className="text-[#79bd45]" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em]">Soil Index</div>
            <div className="mt-1 text-[10px] text-white/34">Global soil health intelligence</div>
          </div>
        </Link>

        <nav className="flex flex-wrap gap-5 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/46" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-[#98d75d]">
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="text-[10px] text-white/28">© 2026 Global Soil Index Initiative</span>
      </div>
    </footer>
  );
}
