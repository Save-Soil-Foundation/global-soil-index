import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Scale, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Global Soil Index",
  description: "The mission, principles, and people behind the Global Soil Index.",
};

const values = [
  {
    title: "Transparent",
    text: "Sources, assumptions, uncertainty, and methodology remain open to scrutiny.",
    Icon: Eye,
  },
  {
    title: "Independent",
    text: "The index is designed as public-interest infrastructure, not a commercial rating.",
    Icon: Scale,
  },
  {
    title: "Volunteer-driven",
    text: "Researchers, technologists, and soil advocates contribute across borders.",
    Icon: Users,
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="relative min-h-[430px] overflow-hidden border border-white/10">
        <Image
          src="/assets/earth-hero.jpg"
          alt="Earth observed from orbit"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,12,15,0.96),rgba(6,12,15,0.65),rgba(6,12,15,0.15))]" />
        <div className="relative flex min-h-[430px] max-w-3xl flex-col justify-end p-6 sm:p-10">
          <p className="gsi-kicker">About the index</p>
          <h1 className="mt-3 text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
            Soil health should be visible, comparable, and impossible to ignore.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/58">
            The Global Soil Index turns complex evidence into a shared public
            benchmark for accountability, restoration, and long-term resilience.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-8 border-y border-white/10 py-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="gsi-kicker">Our purpose</p>
          <h2 className="mt-3 text-2xl font-light uppercase">Measure what sustains us.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {values.map(({ title, text, Icon }) => (
            <article key={title}>
              <Icon size={19} className="text-[#79bd45]" />
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.06em]">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/40">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <p className="gsi-kicker">Built for action</p>
        <p className="mt-4 text-xl font-light leading-8 text-white/72">
          Healthy soils underpin food security, water systems, biodiversity, and
          climate resilience. A trusted index gives governments and communities a
          clear signal of where progress is real and where intervention is urgent.
        </p>
      </section>
    </main>
  );
}
