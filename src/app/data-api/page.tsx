import { pageMetadata } from "@/lib/seo";
import { Braces, Code2, Database, KeyRound, ServerCrash } from "lucide-react";
import { getSoilDataProvider } from "@/lib/soil-data";

export const metadata = pageMetadata(
  "Data API | Soil Index",
  "Developer-facing proposed API documentation for Global Soil Index data.",
  "/data-api"
);

const endpoints = [
  ["GET", "/v1/countries", "List country rankings, scores, availability, and update metadata."],
  ["GET", "/v1/countries/{slug}", "Retrieve a country profile, indicators, sources, and history."],
  ["GET", "/v1/indicators", "List indicator definitions, units, and source categories."],
  ["GET", "/v1/summary", "Retrieve global and regional aggregate statistics."],
  ["GET", "/v1/ticker", "Retrieve the compact ticker sequence and stable change fields."],
] as const;

const responseExample = `{
  "code": "CH",
  "name": "Switzerland",
  "slug": "switzerland",
  "rank": 1,
  "score": 84.7,
  "scoreChange": 0.4,
  "dataAvailability": "complete",
  "measurementDate": "2026-05-26",
  "verificationStatus": "api-normalized"
}`;

const errorExample = `{
  "error": {
    "code": "validation_failed",
    "message": "Country score must be a number between 0 and 100.",
    "requestId": "req_..."
  }
}`;

export default async function DataApiPage() {
  const provider = getSoilDataProvider();
  const [metadata, indicators] = await Promise.all([
    provider.getMetadata(),
    provider.getIndicators(),
  ]);

  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] max-w-[1200px] px-5 py-8 sm:px-8 lg:px-[34px] lg:py-10">
      <header className="border-b border-white/10 pb-8">
        <div className="flex size-11 items-center justify-center rounded-md border border-[#8cbf60]/35 text-[#8cbf60]">
          <Braces size={21} />
        </div>
        <p className="gsi-kicker mt-6">Data API</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
          Soil intelligence, built to travel.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/48">
          This page documents the proposed API contract the frontend is prepared
          to consume. It does not expose functioning production endpoints yet.
        </p>
      </header>

      <section className="mt-8 rounded-md border border-[#8cbf60]/20 bg-[#8cbf60]/8 p-5">
        <div className="flex items-start gap-3">
          <Database size={18} className="mt-0.5 text-[#8cbf60]" />
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.04em] text-[#b8df8a]">
              API availability status
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/52">
              Current provider: {metadata.provider}. The active frontend uses
              the mock provider until a verified production API base URL is configured.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-md border border-white/[0.08] bg-[#141d21]">
          <div className="border-b border-white/10 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/42">
              Proposed endpoints
            </p>
          </div>
          <div className="divide-y divide-white/8">
            {endpoints.map(([method, path, description]) => (
              <article key={path} className="p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-sm bg-[#8cbf60]/12 px-2 py-1 text-[9px] font-bold text-[#b8df8a]">
                    {method}
                  </span>
                  <code className="text-xs text-white/78">{path}</code>
                </div>
                <p className="mt-3 text-xs leading-5 text-white/40">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-white/[0.08] bg-[#141d21] p-5 sm:p-6">
          <p className="gsi-kicker">Access model</p>
          <h2 className="mt-2 text-lg font-medium uppercase">Designed for responsible reuse</h2>
          <div className="mt-6 space-y-4">
            {[
              [Database, "Versioned datasets and source metadata"],
              [KeyRound, "Scoped API keys and documented rate limits"],
              [Code2, "Normalized JSON with explicit nulls for missing values"],
              [ServerCrash, "Structured errors for validation and unavailable data"],
            ].map(([Icon, text]) => {
              const ItemIcon = Icon as typeof Database;
              return (
                <div key={text as string} className="flex items-center gap-3 border-b border-white/8 pb-4 last:border-0">
                  <ItemIcon size={17} className="shrink-0 text-[#8cbf60]" />
                  <span className="text-xs text-white/56">{text as string}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-md border border-white/[0.08] bg-[#10181b] p-5">
          <p className="gsi-kicker">Response example</p>
          <pre className="mt-4 overflow-x-auto rounded-md bg-black/24 p-4 text-xs leading-6 text-white/72">
            <code>{responseExample}</code>
          </pre>
        </article>

        <article className="rounded-md border border-white/[0.08] bg-[#10181b] p-5">
          <p className="gsi-kicker">Error example</p>
          <pre className="mt-4 overflow-x-auto rounded-md bg-black/24 p-4 text-xs leading-6 text-white/72">
            <code>{errorExample}</code>
          </pre>
        </article>
      </section>

      <section className="mt-8 rounded-md border border-white/[0.08] bg-[#141d21] p-5 sm:p-6">
        <p className="gsi-kicker">Data model</p>
        <h2 className="mt-1 text-lg font-medium uppercase">Core fields consumed by the frontend</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Country code",
            "Country name",
            "Slug",
            "Flag reference",
            "Region",
            "Rank",
            "Score",
            "Score change",
            "Indicator values",
            "Measurement date",
            "Source information",
            "Dataset update time",
            "Data availability",
            "Verification status",
          ].map((field) => (
            <div key={field} className="rounded-md border border-white/[0.08] px-3 py-2 text-xs text-white/58">
              {field}
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs leading-5 text-white/38">
          Indicator catalog currently contains {indicators.length} proposed indicator
          definitions. Production API responses should keep missing values as null
          rather than fabricating fallback measurements.
        </p>
      </section>
    </main>
  );
}
