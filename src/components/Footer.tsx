import Link from "next/link";
import { Sprout } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-[#dce4dd] bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-[#14201b]">
            <Sprout size={18} className="text-[#557b1b]" />
            Global Soil Index
          </div>
          <p className="mt-2 max-w-md text-xs leading-5 text-[#718078]">
            Transparent soil intelligence for a resilient and regenerative future.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#516058]" aria-label="Footer navigation">
          <Link href="#methodology" className="hover:text-[#466b16]">Methodology</Link>
          <Link href="#rankings" className="hover:text-[#466b16]">Rankings</Link>
          <Link href="#latest-updates" className="hover:text-[#466b16]">Updates</Link>
          <Link href="#about" className="hover:text-[#466b16]">About</Link>
        </nav>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-[#e7ece8] pt-4 text-[10px] text-[#8a958f] sm:flex-row sm:justify-between">
        <span>© 2026 Global Soil Index Initiative</span>
        <span>Prototype data · Official edition launches World Soil Day 2026</span>
      </div>
    </footer>
  );
}
