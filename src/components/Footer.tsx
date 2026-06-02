import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-6 border-t gsi-border">
      <div className="px-6 py-8">
        <div className="text-center">
          <h3 className="gsi-wordmark text-xl">
            Global <span className="text-lime-400">Soil</span> Index
          </h3>

          <p className="mt-3 text-sm text-white/65">
            Transparent Soil Intelligence for a Regenerative Future
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <Link
              href="/methodology"
              className="transition hover:text-lime-300"
            >
              Methodology
            </Link>

            <Link
              href="/reports"
              className="transition hover:text-lime-300"
            >
              Reports
            </Link>

            <Link
              href="/about"
              className="transition hover:text-lime-300"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-lime-300"
            >
              Contact
            </Link>
          </div>

          <div className="mt-6 border-t border-blue-300/10 pt-4">
            <p className="text-xs text-white/45">
              © 2026 Global Soil Index. All rights reserved.
            </p>

            <p className="mt-2 text-xs text-lime-300/80">
              Demo Version — Real-time dataset scheduled for launch on World Soil Day 2026.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}