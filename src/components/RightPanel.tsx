import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Clock3, Database } from "lucide-react";
import { getAllCountries } from "@/lib/soil-data";

const updates = [
  {
    title: "2026 index framework enters scientific review",
    category: "Research",
    date: "18 Sep 2026",
    image: "/assets/update-1.jpg",
  },
  {
    title: "New data partnerships expand regional coverage",
    category: "Partnerships",
    date: "02 Sep 2026",
    image: "/assets/update-2.jpg",
  },
];

export function RightPanel() {
  const countries = getAllCountries();
  const average = (
    countries.reduce((total, country) => total + country.score, 0) /
    countries.length
  ).toFixed(1);
  const improving = countries.filter((country) => country.change1Y > 0);
  const declining = countries.filter((country) => country.change1Y < 0);
  const topCountries = countries.slice(0, 5);
  const mostImproved = [...countries].sort((a, b) => b.change1Y - a.change1Y).slice(0, 4);
  const mostDeclined = [...countries].sort((a, b) => a.change1Y - b.change1Y).slice(0, 4);

  return (
    <section className="space-y-6">
      <div className="grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
        <article className="px-5 py-6 lg:px-6">
          <p className="text-[10px] uppercase tracking-[0.1em] text-white/34">Global average</p>
          <p className="mt-2 text-4xl font-light tabular-nums">{average}</p>
          <p className="mt-1 text-[10px] text-white/30">out of 100</p>
        </article>
        <article className="border-t border-white/10 px-5 py-6 sm:border-l sm:border-t-0 lg:px-6">
          <p className="text-[10px] uppercase tracking-[0.1em] text-white/34">Average change</p>
          <p className="mt-2 flex items-center text-4xl font-light text-[#79bd45]">
            +0.7 <ArrowUpRight size={20} />
          </p>
          <p className="mt-1 text-[10px] text-white/30">year over year</p>
        </article>
        <article className="border-t border-white/10 px-5 py-6 lg:border-l lg:border-t-0 lg:px-6">
          <p className="text-[10px] uppercase tracking-[0.1em] text-white/34">Advancing</p>
          <p className="mt-2 text-4xl font-light tabular-nums text-[#98d75d]">{improving.length}</p>
          <p className="mt-1 text-[10px] text-white/30">prototype countries</p>
        </article>
        <article className="border-t border-white/10 px-5 py-6 sm:border-l lg:border-t-0 lg:px-6">
          <p className="text-[10px] uppercase tracking-[0.1em] text-white/34">Declining</p>
          <p className="mt-2 text-4xl font-light tabular-nums text-[#ef7770]">{declining.length}</p>
          <p className="mt-1 text-[10px] text-white/30">prototype countries</p>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="gsi-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="gsi-kicker">Leaders</p>
              <h2 className="mt-1 text-lg font-medium uppercase">Top soil markets</h2>
            </div>
            <Database size={18} className="text-[#79bd45]" />
          </div>
          <ol className="mt-5 divide-y divide-white/8">
            {topCountries.map((country) => (
              <li key={country.slug} className="grid grid-cols-[28px_1fr_auto] items-center gap-3 py-3 first:pt-0">
                <span className="text-xl" aria-hidden="true">{country.flag}</span>
                <div>
                  <div className="text-xs font-semibold">{country.name}</div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full bg-[#79bd45]" style={{ width: `${country.score}%` }} />
                  </div>
                </div>
                <span className="text-xs font-semibold tabular-nums text-[#98d75d]">{country.score.toFixed(1)}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="gsi-card p-5 sm:p-6">
          <p className="gsi-kicker">Momentum</p>
          <h2 className="mt-1 text-lg font-medium uppercase">Largest annual moves</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98d75d]">
                <ArrowUpRight size={14} /> Most improved
              </h3>
              <div className="mt-3 divide-y divide-white/8">
                {mostImproved.map((country) => (
                  <div key={country.slug} className="flex items-center gap-2 py-2.5 first:pt-0">
                    <span aria-hidden="true">{country.flag}</span>
                    <span className="min-w-0 flex-1 truncate text-xs">{country.name}</span>
                    <span className="text-xs font-semibold tabular-nums text-[#79bd45]">+{country.change1Y.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#ef7770]">
                <ArrowDownRight size={14} /> Most declined
              </h3>
              <div className="mt-3 divide-y divide-white/8">
                {mostDeclined.map((country) => (
                  <div key={country.slug} className="flex items-center gap-2 py-2.5 first:pt-0">
                    <span aria-hidden="true">{country.flag}</span>
                    <span className="min-w-0 flex-1 truncate text-xs">{country.name}</span>
                    <span className="text-xs font-semibold tabular-nums text-[#ef5959]">{country.change1Y.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="border-t border-white/10 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="gsi-kicker">Field notes</p>
            <h2 className="mt-1 text-lg font-medium uppercase">Latest updates</h2>
          </div>
          <Clock3 size={18} className="text-[#79bd45]" />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {updates.map((update) => (
            <article key={update.title} className="grid grid-cols-[120px_1fr] overflow-hidden border border-white/10 bg-[#0d171b]">
              <div className="relative min-h-[108px]">
                <Image src={update.image} alt="" fill sizes="120px" className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#79bd45]">{update.category}</p>
                <h3 className="mt-2 text-sm font-semibold leading-5">{update.title}</h3>
                <p className="mt-2 text-[10px] text-white/32">{update.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
