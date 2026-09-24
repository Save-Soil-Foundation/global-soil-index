import { pageMetadata } from "@/lib/seo";
import { Braces, Check, Database, KeyRound } from "lucide-react";

export const metadata = pageMetadata(
  "Data API | Soil Index",
  "Developer access to Global Soil Index rankings and indicator data.",
  "/data-api"
);

const endpoints = [
  ["GET", "/v1/countries", "List country rankings and live composite scores."],
  ["GET", "/v1/countries/{code}", "Retrieve a country profile and indicator history."],
  ["GET", "/v1/indicators", "Explore index definitions, units, and source coverage."],
];

export default function DataApiPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="border-b border-white/10 pb-9">
        <div className="flex size-11 items-center justify-center rounded-md border border-[#79bd45]/35 text-[#79bd45]">
          <Braces size={21} />
        </div>
        <p className="gsi-kicker mt-6">Data API</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
          Soil intelligence, built to travel.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/48">
          Programmatic access to rankings, indicators, coverage, and methodology
          metadata will launch with the verified 2026 edition.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="gsi-card overflow-hidden">
          <div className="border-b border-white/10 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/42">Endpoint preview</p>
          </div>
          <div className="divide-y divide-white/8">
            {endpoints.map(([method, path, description]) => (
              <article key={path} className="p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-sm bg-[#79bd45]/12 px-2 py-1 text-[9px] font-bold text-[#98d75d]">{method}</span>
                  <code className="text-xs text-white/78">{path}</code>
                </div>
                <p className="mt-3 text-xs leading-5 text-white/38">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gsi-card p-5 sm:p-6">
          <p className="gsi-kicker">Launch access</p>
          <h2 className="mt-2 text-lg font-medium uppercase">Designed for responsible reuse</h2>
          <div className="mt-6 space-y-4">
            {[
              [Database, "Versioned datasets and source metadata"],
              [KeyRound, "Scoped API keys and documented limits"],
              [Check, "JSON responses with transparent confidence fields"],
            ].map(([Icon, text]) => {
              const ItemIcon = Icon as typeof Database;
              return (
                <div key={text as string} className="flex items-center gap-3 border-b border-white/8 pb-4 last:border-0">
                  <ItemIcon size={17} className="shrink-0 text-[#79bd45]" />
                  <span className="text-xs text-white/56">{text as string}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-7 border border-[#79bd45]/20 bg-[#79bd45]/6 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98d75d]">Status</p>
            <p className="mt-2 text-xs leading-5 text-white/48">
              Documentation and access registration open on World Soil Day,
              5 December 2026.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
