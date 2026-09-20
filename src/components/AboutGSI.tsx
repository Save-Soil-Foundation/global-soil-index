import {
  Database,
  Gauge,
  Scale,
  ShieldCheck,
} from "lucide-react";

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
    text: "A consistent framework makes country-level performance comparable over time.",
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
    <section id="methodology" className="gsi-card scroll-mt-20 px-5 py-6 sm:px-6 sm:py-7">
      <div id="about" className="max-w-2xl scroll-mt-20">
        <p className="gsi-kicker">A common language for soil</p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
          From fragmented data to accountable action
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#64716a]">
          The Global Soil Index translates complex environmental evidence into
          a clear, comparable benchmark without hiding the quality or limits of
          the underlying data.
        </p>
      </div>

      <div className="mt-7 grid border-y border-[#dce4dd] sm:grid-cols-2 xl:grid-cols-4">
        {principles.map(({ number, title, text, Icon }, index) => (
          <article
            key={title}
            className={`py-5 sm:p-5 ${index > 0 ? "border-t border-[#dce4dd] sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l" : ""} ${index > 1 ? "sm:border-t xl:border-t-0" : ""} ${index > 0 ? "xl:border-l" : ""}`}
          >
            <div className="flex items-center justify-between">
              <Icon size={20} className="text-[#557b1b]" />
              <span className="text-xs font-bold text-[#9aa49e]">{number}</span>
            </div>
            <h3 className="mt-4 text-sm font-extrabold">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-[#64716a]">{text}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-[#34423a]">
          Think of it as an economic index for the living ground beneath us.
        </p>
        <span className="text-xs font-bold text-[#557b1b]">
          Full methodology publishes with the 2026 edition
        </span>
      </div>
    </section>
  );
}
