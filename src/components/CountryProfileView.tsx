import Link from "next/link";
import { ArrowLeft, Database, ShieldCheck } from "lucide-react";
import { CountryFlag } from "@/components/CountryFlag";
import type { CountryHistoryPoint, CountryProfile, SoilIndicatorValue } from "@/lib/soil-types";
import { cn } from "@/lib/utils";

type CountryProfileViewProps = {
  profile: CountryProfile;
};

function formatValue(value: number | null) {
  return value === null ? "Unavailable" : value.toFixed(1);
}

function statusTone(status: string) {
  if (status === "complete") return "text-[#8cbf60]";
  if (status === "partial") return "text-[#d7be61]";
  if (status === "limited") return "text-[#d78d55]";
  return "text-[#e05d58]";
}

function IndicatorMeter({ indicator }: { indicator: SoilIndicatorValue }) {
  const value = indicator.value;

  return (
    <article className="rounded-md border border-white/[0.08] bg-[#141d21] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.04em] text-white">
            {indicator.label}
          </h3>
          <p className="mt-2 text-[11px] leading-5 text-white/42">{indicator.description}</p>
        </div>
        <span className={cn("text-sm font-semibold tabular-nums", statusTone(indicator.confidence))}>
          {formatValue(value)}
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className={cn("h-full rounded-full", value === null ? "bg-white/14" : "bg-[#8cbf60]")}
          style={{ width: `${value ?? 0}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.06em]">
        <span className="text-white/30">{indicator.unit}</span>
        <span className={statusTone(indicator.confidence)}>{indicator.confidence}</span>
      </div>
      {indicator.note ? <p className="mt-3 text-[11px] text-white/34">{indicator.note}</p> : null}
    </article>
  );
}

function HistoryChart({ history }: { history: CountryHistoryPoint[] }) {
  const availableScores = history
    .map((point) => point.score)
    .filter((score): score is number => score !== null);
  const maxScore = Math.max(100, ...availableScores);

  return (
    <div className="rounded-md border border-white/[0.08] bg-[#141d21] p-4">
      <div className="flex h-40 items-end gap-2">
        {history.map((point) => {
          const height = point.score === null ? 8 : Math.max(12, (point.score / maxScore) * 100);
          return (
            <div key={point.year} className="flex h-full flex-1 flex-col justify-end gap-2">
              <div
                className={cn(
                  "rounded-t-sm",
                  point.score === null ? "bg-white/12" : "bg-[#8cbf60]"
                )}
                style={{ height: `${height}%` }}
                aria-label={`${point.year}: ${formatValue(point.score)}`}
              />
              <span className="text-center text-[10px] text-white/34">{point.year}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-[11px] leading-5 text-white/38">
        Missing bars indicate years where the mock dataset has no historical value.
      </p>
    </div>
  );
}

export function CountryProfileView({ profile }: CountryProfileViewProps) {
  const { country } = profile;
  const scoreChangePositive = (country.scoreChange ?? 0) >= 0;
  const historicalChangePositive = (country.historicalChange ?? 0) >= 0;

  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] max-w-[1400px] px-5 py-8 sm:px-8 lg:px-[34px] lg:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/44 transition hover:text-[#8cbf60]"
      >
        <ArrowLeft size={14} /> Rankings
      </Link>

      <header className="mt-7 grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="flex items-start gap-5">
          <CountryFlag country={country} width={86} height={56} priority />
          <div>
            <p className="gsi-kicker">{country.region}</p>
            <h1 className="mt-2 text-4xl font-light uppercase leading-none text-white sm:text-5xl">
              {country.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/46">
              {country.sourceSummary}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
          {[
            ["Rank", country.rank === null ? "NA" : `#${country.rank}`, "text-[#8cbf60]"],
            ["Score", formatValue(country.score), "text-white"],
            [
              "Vs yesterday",
              country.scoreChange === null
                ? "N/A"
                : `${scoreChangePositive ? "+" : ""}${country.scoreChange.toFixed(1)}`,
              scoreChangePositive ? "text-[#8cbf60]" : "text-[#e05d58]",
            ],
            [
              "Historical",
              country.historicalChange === null
                ? "N/A"
                : `${historicalChangePositive ? "+" : ""}${country.historicalChange.toFixed(1)}`,
              historicalChangePositive ? "text-[#8cbf60]" : "text-[#e05d58]",
            ],
          ].map(([label, value, tone]) => (
            <article key={label} className="rounded-md border border-white/[0.08] bg-[#141d21] p-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/34">
                {label}
              </p>
              <p className={cn("mt-2 text-2xl font-light tabular-nums", tone)}>{value}</p>
            </article>
          ))}
        </div>
      </header>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="gsi-kicker">Indicators</p>
              <h2 className="mt-2 text-2xl font-light uppercase">Soil-health indicator view</h2>
            </div>
            <span className={cn("text-xs font-semibold uppercase", statusTone(profile.scoreAvailability))}>
              {profile.scoreAvailability}
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {profile.indicators.map((indicator) => (
              <IndicatorMeter key={indicator.id} indicator={indicator} />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <section>
            <p className="gsi-kicker">History</p>
            <h2 className="mt-2 text-2xl font-light uppercase">Available trend</h2>
            <div className="mt-5">
              <HistoryChart history={profile.history} />
            </div>
          </section>

          <section className="rounded-md border border-white/[0.08] bg-[#141d21] p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-[#8cbf60]" />
              <div>
                <p className="gsi-kicker">Data quality</p>
                <h2 className="mt-1 text-lg font-medium uppercase">Verification status</h2>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/52">{profile.dataQuality.summary}</p>
            <ul className="mt-4 space-y-2">
              {profile.dataQuality.limitations.map((limitation) => (
                <li key={limitation} className="text-xs leading-5 text-white/40">
                  {limitation}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-md border border-white/[0.08] bg-[#141d21] p-5">
            <div className="flex items-center gap-3">
              <Database size={18} className="text-[#8cbf60]" />
              <div>
                <p className="gsi-kicker">Sources</p>
                <h2 className="mt-1 text-lg font-medium uppercase">Data inputs</h2>
              </div>
            </div>
            <div className="mt-5 divide-y divide-white/[0.08]">
              {profile.sources.map((source) => (
                <article key={source.label} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.04em]">
                      {source.label}
                    </h3>
                    <span className={cn("text-[10px] font-semibold uppercase", statusTone(source.status))}>
                      {source.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/42">{source.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 border-t border-white/[0.08] pt-4 text-[11px] text-white/34">
              Last measurement date: {profile.lastMeasurementDate ?? "Unavailable"}
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}
