// Country members only; excludes regional bodies, partners and invited guests.
// Reviewed 2026-10-17 against official membership lists:
// G7: https://g7.canada.ca/assets/ea689367/Attachments/NewItems/pdf/joint-fmm-en.pdf
// G20: https://www.g20.org.za/about-g20/g20-members/
// BRICS: https://brics.br/en/about-the-brics
// BRICS follows the chair's published eleven-member list, including Saudi Arabia.
import type { CountryRanking, CountryRegion } from "./soil-types";

type CountryGroupDefinition = { label: string; codes?: readonly string[]; regions?: readonly CountryRegion[] };

export const countryGroups = {
  g7: { label: "G7", codes: ["CA", "FR", "DE", "IT", "JP", "GB", "US"] },
  g20: { label: "G20", codes: ["AR", "AU", "BR", "CA", "CN", "FR", "DE", "IN", "ID", "IT", "JP", "KR", "MX", "RU", "SA", "ZA", "TR", "GB", "US"] },
  brics: { label: "BRICS", codes: ["BR", "RU", "IN", "CN", "ZA", "EG", "ET", "ID", "IR", "SA", "AE"] },
  // EU membership: https://european-union.europa.eu/principles-countries-history/eu-countries_en
  eu: { label: "EU", codes: ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"] },
  // Product definition, not a membership body: Asia + Oceania in our dataset.
  apac: { label: "APAC", regions: ["Asia", "Oceania"] },
  africa: { label: "Africa", regions: ["Africa"] },
  asia: { label: "Asia", regions: ["Asia"] },
  europe: { label: "Europe", regions: ["Europe"] },
  "north-america": { label: "North America", regions: ["North America"] },
  "south-america": { label: "South America", regions: ["South America"] },
  oceania: { label: "Oceania", regions: ["Oceania"] },
} satisfies Record<string, CountryGroupDefinition>;

export function matchesCountryGroup(country: CountryRanking, group: CountryGroup): boolean {
  if (group === "all") return true;
  const definition: CountryGroupDefinition = countryGroups[group];
  return Boolean(definition.codes?.includes(country.code) || definition.regions?.includes(country.region));
}

export type CountryGroup = "all" | keyof typeof countryGroups;
