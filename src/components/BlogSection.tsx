import Link from "next/link";
import { ArrowUpRight, BookOpen, Globe2, Sprout } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/SectionHeader";

const posts = [
  {
    title: "What soil health rankings can reveal about national resilience",
    excerpt:
      "How organic carbon, vegetation cover, erosion risk, and policy readiness combine into a comparable country signal.",
    category: "Methodology",
    href: "/methodology",
    Icon: Sprout,
  },
  {
    title: "Why country-level soil data needs transparent uncertainty",
    excerpt:
      "A practical view of data availability, modelled estimates, field observations, and the review process behind public dashboards.",
    category: "Data quality",
    href: "/insights",
    Icon: BookOpen,
  },
  {
    title: "From soil maps to action: turning indicators into restoration priorities",
    excerpt:
      "How spatial soil intelligence can support researchers, policymakers, and civil-society campaigns across regions.",
    category: "Spatial insight",
    href: "/map",
    Icon: Globe2,
  },
];

export function BlogSection() {
  return (
    <section className="gsi-animate-panel mt-6 border-y border-white/10 py-6 sm:mt-7 sm:py-7">
      <SectionHeader
        eyebrow="Research notes"
        title="SEO-ready soil health explainers and index updates."
        description="Short, crawlable insight cards give visitors and search engines a clearer path into the methodology, data-quality story, and map experience."
        actions={<Badge>Editorial hub</Badge>}
      />

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {posts.map(({ title, excerpt, category, href, Icon }) => (
          <Link
            key={title}
            href={href}
            className="gsi-hover-lift group rounded-md border border-white/[0.08] bg-[#141d21] p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbf60]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-[#8cbf60]">
                <Icon size={17} />
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase text-white/36 transition group-hover:text-[#8cbf60]">
                {category}
                <ArrowUpRight size={12} />
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold leading-6 text-white">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-white/42">{excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
