import { Database, Handshake, Landmark, Microscope } from "lucide-react";

export const partnershipTracks = [
  {
    id: "research",
    title: "Research institutions",
    description: "Methods review, indicator calibration, and soil-science validation.",
    Icon: Microscope,
    status: "Scientific review",
    logos: [],
  },
  {
    id: "data",
    title: "Data providers",
    description: "Remote sensing, national inventories, field records, and open geospatial layers.",
    Icon: Database,
    status: "Data pipelines",
    logos: [],
  },
  {
    id: "civil",
    title: "Civil society",
    description: "Soil advocacy networks, education partners, and restoration communities.",
    Icon: Handshake,
    status: "Outreach",
    logos: [
      {
        partnerId: "save-soil-foundation",
        name: "Save Soil Foundation",
        src: "/assets/logos/civil-society/save-soil-foundation.png",
        className: "size-14",
      },
      {
        partnerId: "save-soil-foundation",
        name: "Save Soil Foundation",
        src: "/assets/logos/civil-society/save-soil-foundation-light.png",
        className: "h-auto w-full max-w-[164px]",
      },
    ],
  },
  {
    id: "public",
    title: "Public agencies",
    description: "Policy context, country submissions, and future verification pathways.",
    Icon: Landmark,
    status: "Governance",
    logos: [],
  },
] as const;

export function getPartnershipSummary() {
  const logoCount = partnershipTracks.reduce((total, track) => total + track.logos.length, 0);
  const partnerIds = new Set(partnershipTracks.flatMap((track) => track.logos.map((logo) => logo.partnerId)));
  const activeTrackCount = partnershipTracks.filter((track) => track.logos.length > 0).length;

  return {
    logoCount,
    confirmedOrganizationCount: partnerIds.size,
    activeTrackCount,
    awaitingTrackCount: partnershipTracks.length - activeTrackCount,
    trackCounts: partnershipTracks.map((track) => ({
      id: track.id,
      label: track.title,
      count: new Set(track.logos.map((logo) => logo.partnerId)).size,
    })),
  };
}
