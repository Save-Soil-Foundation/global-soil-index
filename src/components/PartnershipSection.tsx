import { BadgeCheck, Building2, Database, Handshake, Landmark, Microscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/SectionHeader";

const partnerTracks = [
  {
    title: "Research institutions",
    description: "Methods review, indicator calibration, and soil-science validation.",
    Icon: Microscope,
    status: "Scientific review",
  },
  {
    title: "Data providers",
    description: "Remote sensing, national inventories, field records, and open geospatial layers.",
    Icon: Database,
    status: "Data pipelines",
  },
  {
    title: "Civil society",
    description: "Soil advocacy networks, education partners, and restoration communities.",
    Icon: Handshake,
    status: "Outreach",
  },
  {
    title: "Public agencies",
    description: "Policy context, country submissions, and future verification pathways.",
    Icon: Landmark,
    status: "Governance",
  },
];

const governanceSteps = [
  "Methodology review",
  "Data-quality checks",
  "Regional calibration",
  "Public release",
];

export function PartnershipSection() {
  return (
    <section className="gsi-animate-panel mt-6 border-y border-white/10 py-6 sm:mt-7 sm:py-7">
      <SectionHeader
        eyebrow="Partner ecosystem"
        title="Built for collaboration, review, and credible stewardship."
        description="The index is structured so confirmed partner organizations, reviewers, and data contributors can be represented clearly without turning the dashboard into a marketing page."
        actions={<Badge variant="success">Partner-ready</Badge>}
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {partnerTracks.map(({ title, description, Icon, status }) => (
          <article
            key={title}
            className="gsi-hover-lift rounded-md border border-white/[0.08] bg-[#141d21] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-9 items-center justify-center rounded-md border border-[#8cbf60]/24 bg-[#8cbf60]/10 text-[#a8d77a]">
                <Icon size={17} />
              </span>
              <Badge>{status}</Badge>
            </div>
            <h3 className="mt-4 text-sm font-semibold uppercase text-white">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-white/42">{description}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-3 rounded-md border border-white/[0.08] bg-[#10191d] p-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-md bg-white/[0.04] text-[#8cbf60]">
            <Building2 size={18} />
          </span>
          <div>
            <h3 className="text-sm font-semibold uppercase text-white">Decision and review path</h3>
            <p className="mt-1 text-xs leading-5 text-white/40">
              Use this area for confirmed steering partners, reviewers, or institutional logos.
            </p>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-4">
          {governanceSteps.map((step, index) => (
            <div key={step} className="flex items-center gap-2 rounded-md bg-white/[0.035] px-3 py-2">
              <BadgeCheck size={14} className="shrink-0 text-[#8cbf60]" />
              <span className="text-[10px] font-semibold uppercase leading-4 text-white/58">
                {index + 1}. {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
