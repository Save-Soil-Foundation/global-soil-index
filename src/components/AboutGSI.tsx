import { Database, Gauge, Scale, ShieldCheck } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Measure",
    text: "Nine indicators combine observed soil condition, pressure, and resilience.",
    Icon: Gauge,
  },
  {
    number: "02",
    title: "Verify",
    text: "Satellite observations are checked against reported and ground-level data.",
    Icon: Database,
  },
  {
    number: "03",
    title: "Compare",
    text: "A consistent framework makes country performance comparable over time.",
    Icon: Scale,
  },
  {
    number: "04",
    title: "Act",
    text: "Policy tracking connects environmental outcomes to accountable action.",
    Icon: ShieldCheck,
  },
];

export function AboutGSI() {
  return (
    <section id="methodology" className="scroll-mt-24 border-t border-white/12 pt-7">
      <div id="about" className="scroll-mt-24">
        <p className="gsi-kicker">Open methodology</p>
        <h2 className="mt-2 max-w-2xl text-2xl font-medium uppercase leading-tight text-white sm:text-3xl">
          A common language for the ground beneath us
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/48">
          The Global Soil Index turns fragmented environmental evidence into a
          transparent benchmark while keeping data quality and uncertainty visible.
        </p>
      </div>

      <div className="mt-8 grid border-y border-white/10 sm:grid-cols-2">
        {principles.map(({ number, title, text, Icon }, index) => (
          <article
            key={title}
            className={`p-5 sm:p-6 ${index > 0 ? "border-t border-white/10" : ""} ${index % 2 === 1 ? "sm:border-l" : ""} ${index === 2 ? "sm:border-t" : ""}`}
          >
            <div className="flex items-center justify-between">
              <Icon size={20} className="text-[#79bd45]" />
              <span className="text-[10px] font-semibold text-white/28">{number}</span>
            </div>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.05em]">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-white/42">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
