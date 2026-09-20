import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Clock3, MapPin } from "lucide-react";
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
  const topCountries = countries.slice(0, 3);
  const mostImproved = [...countries].sort((a, b) => b.change1Y - a.change1Y)[0];
  const mostDeclined = [...countries].sort((a, b) => a.change1Y - b.change1Y)[0];

  return (
    <aside className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
      <section className="gsi-card p-5 sm:p-6">
        <p className="gsi-kicker">At a glance</p>
        <h2 className="mt-1 text-lg font-extrabold">Global snapshot</h2>

        <div className="mt-5 grid grid-cols-2 border-y border-[#dce4dd] py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#7b8880]">
              Average score
            </p>
            <p className="mt-1 text-3xl font-black text-[#14201b]">{average}</p>
            <p className="text-[11px] text-[#7b8880]">out of 100</p>
          </div>
          <div className="border-l border-[#dce4dd] pl-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#7b8880]">
              Average change
            </p>
            <p className="mt-1 flex items-center text-3xl font-black text-[#557b1b]">
              +0.7 <ArrowUpRight size={20} />
            </p>
            <p className="text-[11px] text-[#7b8880]">year over year</p>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-[#7b8880]">
            Leading countries
          </h3>
          <ol className="mt-3 space-y-3">
            {topCountries.map((country) => (
              <li key={country.slug} className="grid grid-cols-[22px_1fr_auto] items-center gap-2 text-sm">
                <span aria-hidden="true" className="text-lg">{country.flag}</span>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate font-semibold">{country.name}</span>
                    <span className="text-xs font-extrabold">{country.score}</span>
                  </div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#e7ece8]">
                    <div className="h-full rounded-full bg-[#6e9d24]" style={{ width: `${country.score}%` }} />
                  </div>
                </div>
                <span className="sr-only">Score {country.score}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#dce4dd] pt-4">
          <div>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#7b8880]">
              <ArrowUpRight size={13} /> Most improved
            </span>
            <p className="mt-1 text-xs font-bold">{mostImproved.name}</p>
          </div>
          <div>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#7b8880]">
              <ArrowDownRight size={13} /> Most declined
            </span>
            <p className="mt-1 text-xs font-bold">{mostDeclined.name}</p>
          </div>
        </div>
      </section>

      <section id="health-map" className="gsi-card scroll-mt-20 overflow-hidden">
        <div className="p-5 pb-4 sm:p-6 sm:pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="gsi-kicker">Spatial view</p>
              <h2 className="mt-1 text-lg font-extrabold">Soil health map</h2>
            </div>
            <MapPin size={19} className="text-[#557b1b]" />
          </div>
          <p className="mt-2 text-xs leading-5 text-[#64716a]">
            Explore patterns across ecosystems, borders, and climate regions.
          </p>
        </div>
        <div className="relative aspect-[2/1] border-y border-[#dce4dd]">
          <Image
            src="/assets/soil-map.jpg"
            alt="World map showing soil health conditions by region"
            fill
            sizes="(min-width: 1536px) 340px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-between gap-3 px-5 py-3 text-[11px] sm:px-6">
          <span className="font-semibold text-[#557b1b]">Interactive explorer</span>
          <span className="text-[#7b8880]">Available at launch</span>
        </div>
      </section>

      <section id="latest-updates" className="gsi-card scroll-mt-20 p-5 sm:p-6 md:col-span-2 xl:col-span-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="gsi-kicker">Field notes</p>
            <h2 className="mt-1 text-lg font-extrabold">Latest updates</h2>
          </div>
          <Clock3 size={18} className="text-[#557b1b]" />
        </div>

        <div className="mt-4 divide-y divide-[#dce4dd]">
          {updates.map((update) => (
            <article key={update.title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
              <div className="relative h-[66px] w-[84px] shrink-0 overflow-hidden rounded-md">
                <Image src={update.image} alt="" fill sizes="84px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#557b1b]">
                  {update.category}
                </div>
                <h3 className="mt-1 text-xs font-bold leading-4">{update.title}</h3>
                <p className="mt-1 text-[10px] text-[#879189]">{update.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </aside>
  );
}
