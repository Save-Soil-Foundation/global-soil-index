import Link from "next/link";
import { ChevronDown, Eye, Scale, ShieldCheck, Users } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageEarthStrip } from "@/components/PageEarthStrip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata(
  "About | Soil Index",
  "Our mission is to make soil health visible, understandable, and actionable. Explore the purpose, principles, and development of Soil Index.",
  "/about"
);

const values = [
  { title: "Transparent", text: "Make sources, assumptions, uncertainty, and methodology open to scrutiny.", Icon: Eye },
  { title: "Comparable", text: "Build consistent comparisons and explain the context needed to interpret them.", Icon: Scale },
  { title: "Responsible", text: "Make the limits of the evidence clear. Country rankings cannot replace local measurements or expert judgement.", Icon: ShieldCheck },
  { title: "Collaborative", text: "Create space for researchers, practitioners, technologists, and soil advocates to contribute.", Icon: Users },
];

const audiences = [
  ["Public decision-makers", "A starting point for understanding national context and asking better policy questions."],
  ["Researchers & practitioners", "A way to explore evidence, scrutinize assumptions, and identify information gaps."],
  ["People & communities", "A clearer way to learn about soil and advocate for its protection."],
];

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-96px)] px-5 pb-8 pt-5 sm:px-8 lg:px-[34px] lg:pt-6">
      <PageEarthStrip
        eyebrow="Our mission"
        title="Protect the soil. Protect our shared future."
        description="Soil Index is being built to make soil health visible, understandable, and actionable—so the ground that sustains humanity gets the attention it deserves."
        panelLabel="Our commitments"
        panelItems={[["Open", "Sources"], ["Clear", "Context"], ["Responsible", "Use"], ["Shared", "Knowledge"]]}
      >
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="#purpose" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "rounded-full")}>Why we exist</a>
          <Link href="/methodology" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}>Explore our methodology</Link>
        </div>
      </PageEarthStrip>

      <section id="purpose" aria-labelledby="purpose-title" className="grid scroll-mt-28 gap-8 border-b border-white/10 py-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="gsi-kicker">Why we exist</p>
          <h2 id="purpose-title" className="mt-3 text-2xl font-light uppercase">The soil we depend on deserves to be understood.</h2>
          <p className="mt-4 text-sm leading-6 text-white/46">Our mission is to help people see the importance of soil in everyday life—and help decision-makers give its protection and restoration a place in the decisions that shape our future.</p>
          <p className="mt-4 text-sm leading-6 text-white/46">We envision a world where soil health is understood, valued, and protected as a shared foundation for human wellbeing.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map(({ title, text, Icon }) => (
            <article key={title} className="rounded-md border border-white/[0.08] bg-[#141d21] p-5">
              <Icon size={19} aria-hidden="true" className="text-[#8cbf60]" />
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.06em]">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/42">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="action-title" className="border-b border-white/10 py-8">
        <p className="gsi-kicker">From understanding to action</p>
        <h2 id="action-title" className="mt-3 text-2xl font-light uppercase">A clearer picture. Better decisions.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Make it visible", "Bring soil health information into country profiles, maps, and accessible explanations."],
            ["Make it meaningful", "Explain what indicators reveal, where evidence is limited, and how comparisons should be read."],
            ["Support action", "Help people identify questions, priorities, and opportunities for soil protection and restoration."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-md border border-white/[0.08] bg-[#141d21] p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.06em]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/46">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="audience-title" className="border-b border-white/10 py-8">
        <p className="gsi-kicker">Who it serves</p>
        <h2 id="audience-title" className="mt-3 text-2xl font-light uppercase">Shared knowledge for a shared responsibility.</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {audiences.map(([title, text]) => (
            <article key={title} className="border-t border-white/10 pt-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.06em]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/46">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="trust-title" className="grid gap-8 border-b border-white/10 py-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="gsi-kicker">Trust & accountability</p>
          <h2 id="trust-title" className="mt-3 text-2xl font-light uppercase">Ambition must stand on evidence.</h2>
          <p className="mt-4 text-sm leading-6 text-white/46">Our goal is a useful public resource whose claims can be questioned and whose limitations can be understood.</p>
          <Link href="/methodology" className="mt-4 inline-block text-sm text-[#a7d87d] underline-offset-4 hover:underline">Read the methodology →</Link>
        </div>
        <div className="space-y-4">
          {[
            ["Our commitment to evidence", "Publish the basis for indicators, comparisons, and updates. Make uncertainty and missing information visible. Explain what a ranking can tell you—and where it cannot provide an answer."],
            ["Currently in development", "The current rankings and scores are demonstration data for developing the platform. They are not verified scientific measurements."],
          ].map(([title, text]) => (
            <details key={title} className="group rounded-md border border-white/[0.08] bg-[#141d21]">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-md p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98d75d] sm:p-6 [&::-webkit-details-marker]:hidden">
                <h3 className={`text-xs font-semibold uppercase tracking-[0.06em] ${title === "Currently in development" ? "text-[#8cbf60]" : ""}`}>{title}</h3>
                <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-[#8cbf60] transition-transform group-open:rotate-180 motion-reduce:transition-none" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-6 text-white/68 sm:px-6 sm:pb-6">{text}</p>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="future-title" className="grid gap-8 py-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div><p className="gsi-kicker">Our path forward</p><h2 id="future-title" className="mt-3 text-2xl font-light uppercase">Build the evidence. Earn the trust. Enable better action.</h2></div>
        <div>
          <p className="text-sm leading-6 text-white/46">Our next priorities are to validate the methodology, integrate documented data sources, and invite scientific review before presenting verified rankings.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/methodology" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "rounded-full")}>Explore the methodology</Link>
            <Link href="/map" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}>Explore the soil map</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
