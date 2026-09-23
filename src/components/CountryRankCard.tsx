import Link from "next/link";
import type { CSSProperties } from "react";
import { CountryFlag } from "@/components/CountryFlag";
import type { CountryRanking } from "@/lib/soil-types";

type CountryRankCardProps = {
  country: CountryRanking;
  index: number;
};

function formatRank(rank: number | null) {
  return rank === null ? "NA" : rank.toString();
}

function formatScore(score: number | null) {
  return score === null ? "N/A" : score.toFixed(1);
}

export function CountryRankCard({ country, index }: CountryRankCardProps) {
  return (
    <Link
      href={`/country/${country.slug}`}
      className="gsi-animate-card gsi-hover-lift group flex min-h-[104px] flex-col items-center justify-center rounded-md border border-white/[0.055] bg-[#192226] px-2 py-2 text-center hover:border-[#8cbf60]/45 hover:bg-[#1d292e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbf60] sm:min-h-[118px] sm:py-2.5 xl:min-h-[116px]"
      style={{ "--gsi-index": index } as CSSProperties}
    >
      <CountryFlag country={country} width={44} height={29} priority={index < 10} />
      <div className="mt-1.5 text-[11px] font-semibold leading-none tabular-nums text-[#8cbf60] sm:text-[12px]">
        {formatRank(country.rank)}
      </div>
      <h2 className="mt-1 flex min-h-[24px] max-w-full items-center text-balance text-[10px] font-semibold leading-[12px] text-white sm:min-h-[26px] sm:text-[10.5px] sm:leading-[13px]">
        {country.name}
      </h2>
      <div className="mt-0.5 text-[10.5px] font-medium tabular-nums text-white/80 sm:mt-1 sm:text-[11px]">
        {formatScore(country.score)}
      </div>
    </Link>
  );
}
