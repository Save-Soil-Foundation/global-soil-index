import { countries } from "@/data/countries";

export function getAllCountries() {
  return countries;
}

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}