import Image from "next/image";
import type { CountryRanking } from "@/lib/soil-types";
import { cn } from "@/lib/utils";

type CountryFlagProps = {
  country: Pick<CountryRanking, "flagUrl" | "flagAlt" | "name">;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function CountryFlag({
  country,
  className,
  width = 64,
  height = 42,
  priority = false,
}: CountryFlagProps) {
  return (
    <Image
      src={country.flagUrl}
      alt={country.flagAlt || `${country.name} flag`}
      width={width}
      height={height}
      priority={priority}
      style={{ width, height }}
      className={cn("rounded-[2px] object-cover shadow-[0_4px_12px_rgba(0,0,0,0.22)]", className)}
      sizes={`${width}px`}
    />
  );
}
