import Image from "next/image";
import { Database, Handshake, Landmark, Microscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/SectionHeader";

const partnerTracks = [
  {
    title: "Research institutions",
    description: "Methods review, indicator calibration, and soil-science validation.",
    Icon: Microscope,
    status: "Scientific review",
    logos: [],
  },
  {
    title: "Data providers",
    description: "Remote sensing, national inventories, field records, and open geospatial layers.",
    Icon: Database,
    status: "Data pipelines",
    logos: [],
  },
  {
    title: "Civil society",
    description: "Soil advocacy networks, education partners, and restoration communities.",
    Icon: Handshake,
    status: "Outreach",
    logos: [
      {
        name: "Save Soil Foundation",
        src: "/assets/logos/civil-society/save-soil-foundation.png",
      },
    ],
  },
  {
    title: "Public agencies",
    description: "Policy context, country submissions, and future verification pathways.",
    Icon: Landmark,
    status: "Governance",
    logos: [],
  },
];

export function PartnershipSection() {
  return (
    <section className="gsi-animate-panel mt-6 border-y border-white/10 py-5 sm:mt-7 sm:py-6">
      <SectionHeader
        eyebrow="Partnerships"
        title="A place for collaborators and review partners."
        description="Use this section for confirmed organizations, reviewers, and data contributors as the index grows."
        actions={<Badge variant="success">Partner-ready</Badge>}
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {partnerTracks.map(({ title, description, Icon, status, logos }) => (
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
            {logos.length > 0 ? (
              <div className="mt-4 border-t border-white/[0.08] pt-4">
                <div className="flex min-h-16 items-center">
                  {logos.map((logo) => (
                    <Image
                      key={logo.name}
                      src={logo.src}
                      alt={logo.name}
                      width={96}
                      height={96}
                      sizes="96px"
                      className="size-16 object-contain sm:size-[72px]"
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
