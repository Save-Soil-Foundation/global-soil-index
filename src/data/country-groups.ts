// Membership reviewed 2026-09-24. Country members only; regional bodies and guests excluded.
// EU: https://european-union.europa.eu/easy-read_en
// G7: https://g7.canada.ca/fr/information-G7/
// BRICS: https://brics.br/en/about-the-brics (includes Saudi Arabia in the chair's published list)
// G20: https://www.g20.org.za/about-g20/g20-members/
export const countryGroups = {
  eu: { label: "European Union", codes: ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"] },
  g7: { label: "G7 countries", codes: ["CA", "FR", "DE", "IT", "JP", "GB", "US"] },
  brics: { label: "BRICS", codes: ["BR", "RU", "IN", "CN", "ZA", "EG", "ET", "ID", "IR", "SA", "AE"] },
  g20: { label: "G20 countries", codes: ["AR", "AU", "BR", "CA", "CN", "FR", "DE", "IN", "ID", "IT", "JP", "KR", "MX", "RU", "SA", "ZA", "TR", "GB", "US"] },
};
export type CountryGroup = "all" | keyof typeof countryGroups;
