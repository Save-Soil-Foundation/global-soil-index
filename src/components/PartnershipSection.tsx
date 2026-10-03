import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/SectionHeader";
import { partnershipTracks } from "@/lib/partnerships";

export function PartnershipSection() {
  return (
    <section className="gsi-animate-panel border-b border-white/10 py-5 sm:py-6">
      <SectionHeader
        eyebrow="Confirmed network"
        title="Organizations supporting the index."
        description="Scientific, data, civil-society, and public-interest collaborators shown as they are confirmed."
        actions={<Badge variant="success">Partner-ready</Badge>}
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {partnershipTracks.map(({ title, description, Icon, status, logos }) => (
          <article
            key={title}
            className="gsi-hover-lift flex min-h-[248px] flex-col rounded-md border border-white/[0.08] bg-[#141d21] p-4"
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
              <div className="mt-auto border-t border-white/[0.08] pt-4">
                <div className="flex flex-col items-center gap-3 py-1">
                  {logos.map((logo) => (
                    <Image
                      key={logo.src}
                      src={logo.src}
                      alt={logo.name}
                      width={96}
                      height={96}
                      sizes="96px"
                      className={`${logo.className} object-contain`}
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
