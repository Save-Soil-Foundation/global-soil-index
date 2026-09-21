"use client";

import { Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = [
  { label: "Rankings", href: "/" },
  { label: "Methodology", href: "/methodology" },
  { label: "Insights", href: "/insights" },
  { label: "Soil map", href: "/map" },
  { label: "About", href: "/about" },
];

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/") return null;

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
