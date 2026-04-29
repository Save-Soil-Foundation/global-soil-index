import { Building2, Globe2, Leaf, Satellite, Users } from "lucide-react";

const cards = [
  {
    number: "01",
    title: "What is GSI?",
    text: "The Global Soil Index ranks countries based on the health of their soil using key indicators.",
    Icon: Leaf,
  },
  {
    number: "02",
    title: "How it Works",
    text: "GSI integrates satellite data, ground measurements, and environmental models.",
    Icon: Satellite,
  },
  {
    number: "03",
    title: "Why it Matters",
    text: "Healthy soils underpin food security, water, biodiversity, and climate resilience.",
    Icon: Globe2,
  },
  {
    number: "04",
    title: "What it Drives",
    text: "GSI drives accountability and inspires action to restore soil health globally.",
    Icon: Building2,
  },
];

export function AboutGSI() {
  return (
    <section className="gsi-card p-4 sm:p-5">
      <div>
        <h2 className="gsi-heading text-xl">What is the Global Soil Index?</h2>
        <p className="mt-1 text-sm text-white/70">
          A comprehensive, science-based assessment of soil health across the world.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ number, title, text, Icon }) => (
          <article key={title} className="rounded-xl border gsi-border p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="rounded-full bg-lime-400/15 p-3 text-lime-300">
                <Icon size={24} />
              </div>
              <span className="rounded-md bg-sky-500/10 px-2 py-1 text-xs text-cyan-300">
                {number}
              </span>
            </div>

            <h3 className="mt-4 text-sm font-bold">{title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/65">{text}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-xl border gsi-border bg-blue-950/30 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Users className="shrink-0 text-lime-300" size={22} />
          <span>Similar to how GDP measures economic health, GSI measures soil health.</span>
        </div>

        <span className="font-semibold text-lime-300">
          Learn more about our methodology →
        </span>
      </div>
    </section>
  );
}