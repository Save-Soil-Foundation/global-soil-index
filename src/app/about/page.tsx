import type { Metadata } from "next";
import { Eye, Scale, ShieldCheck, Users } from "lucide-react";
import { getSoilDataProvider } from "@/lib/soil-data";

export const metadata: Metadata = {
  title: "About | Global Soil Index",
  description: "The purpose, principles, and current prototype status of the Global Soil Index.",
};

const values = [
  {
    title: "Transparent",
    text: "Sources, assumptions, uncertainty, and methodology should remain open to scrutiny.",
    Icon: Eye,
  },
  {
    title: "Comparable",
    text: "Country-level signals need a consistent model before production rankings can be trusted.",
    Icon: Scale,
  },
  {
    title: "Responsible",
    text: "Prototype fixtures must not be presented as verified scientific measurements.",
    Icon: ShieldCheck,
  },
  {
    title: "Collaborative",
    text: "The project is designed for future contributions from researchers, technologists, and soil advocates.",
    Icon: Users,
  },
];

export default async function AboutPage() {
  const provider = getSoilDataProvider();
  const [summary, metadata] = await Promise.all([
    provider.getSummary(),
    provider.getMetadata(),
  ]);

  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] max-w-[1400px] px-5 py-8 sm:px-8 lg:px-[34px] lg:py-10">
      <header className="border-b border-white/10 pb-8">
        <p className="gsi-kicker">About the index</p>
        <h1 className="mt-3 max-w-5xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
          Soil health should be visible, comparable, and impossible to ignore.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/48">
          The Global Soil Index frontend is being prepared as a public-facing
          intelligence dashboard for rankings, profiles, spatial exploration,
          methodology, and future API access.
        </p>
      </header>

      <section className="mt-8 grid gap-8 border-y border-white/10 py-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="gsi-kicker">Purpose</p>
          <h2 className="mt-3 text-2xl font-light uppercase">Measure what sustains us.</h2>
          <p className="mt-4 text-sm leading-6 text-white/46">
            Healthy soils underpin food security, water systems, biodiversity,
            and climate resilience. A trusted index can help make soil degradation
            and restoration progress easier to see.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map(({ title, text, Icon }) => (
            <article key={title} className="rounded-md border border-white/[0.08] bg-[#141d21] p-5">
              <Icon size={19} className="text-[#8cbf60]" />
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.06em]">
                {title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/42">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid border-y border-white/10 sm:grid-cols-3">
        {[
          [summary.countryCount.toString(), "Countries", "Included in the mock provider"],
          [summary.rankedCountryCount.toString(), "Ranked records", "Available for UI testing"],
          [metadata.statusLabel, "Data status", "Prototype fixture dataset"],
        ].map(([value, label, detail], index) => (
          <article
            key={label}
            className={`px-5 py-6 ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}
          >
            <p className="text-3xl font-light tabular-nums text-white">{value}</p>
            <h2 className="mt-2 text-[10px] font-semibold uppercase tracking-[0.08em]">
              {label}
            </h2>
            <p className="mt-1 text-[10px] text-white/32">{detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 max-w-4xl rounded-md border border-white/[0.08] bg-[#141d21] p-6">
        <p className="gsi-kicker">Current status</p>
        <p className="mt-4 text-lg font-light leading-8 text-white/68">
          {metadata.sourceNote} The frontend is structured so a verified production
          soil-health API can replace the mock provider without redesigning the
          interface.
        </p>
      </section>
    </main>
  );
}
