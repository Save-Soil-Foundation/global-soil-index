export type PolicyStatus = "Strong" | "Moderate" | "Weak" | "Critical";
export type Trend = "up" | "down";

export type CountryRanking = {
  rank: number;
  flag: string;
  name: string;
  slug: string;
  region: string;
  incomeGroup: string;
  score: number;
  trend: Trend;
  change1Y: number;
  indicators: string;
  policyStatus: PolicyStatus;
};

const baseCountries = [
  ["Afghanistan", "AF", "Asia"],
  ["Albania", "AL", "Europe"],
  ["Algeria", "DZ", "Africa"],
  ["Argentina", "AR", "South America"],
  ["Australia", "AU", "Oceania"],
  ["Austria", "AT", "Europe"],
  ["Bangladesh", "BD", "Asia"],
  ["Belgium", "BE", "Europe"],
  ["Brazil", "BR", "South America"],
  ["Canada", "CA", "North America"],
  ["Chile", "CL", "South America"],
  ["China", "CN", "Asia"],
  ["Colombia", "CO", "South America"],
  ["Denmark", "DK", "Europe"],
  ["Egypt", "EG", "Africa"],
  ["Finland", "FI", "Europe"],
  ["France", "FR", "Europe"],
  ["Germany", "DE", "Europe"],
  ["Greece", "GR", "Europe"],
  ["India", "IN", "Asia"],
  ["Indonesia", "ID", "Asia"],
  ["Iran", "IR", "Asia"],
  ["Iraq", "IQ", "Asia"],
  ["Ireland", "IE", "Europe"],
  ["Israel", "IL", "Asia"],
  ["Italy", "IT", "Europe"],
  ["Japan", "JP", "Asia"],
  ["Kenya", "KE", "Africa"],
  ["Malaysia", "MY", "Asia"],
  ["Mexico", "MX", "North America"],
  ["Netherlands", "NL", "Europe"],
  ["New Zealand", "NZ", "Oceania"],
  ["Nigeria", "NG", "Africa"],
  ["Norway", "NO", "Europe"],
  ["Pakistan", "PK", "Asia"],
  ["Peru", "PE", "South America"],
  ["Philippines", "PH", "Asia"],
  ["Poland", "PL", "Europe"],
  ["Portugal", "PT", "Europe"],
  ["Qatar", "QA", "Asia"],
  ["Russia", "RU", "Europe"],
  ["Saudi Arabia", "SA", "Asia"],
  ["Singapore", "SG", "Asia"],
  ["South Africa", "ZA", "Africa"],
  ["South Korea", "KR", "Asia"],
  ["Spain", "ES", "Europe"],
  ["Sweden", "SE", "Europe"],
  ["Switzerland", "CH", "Europe"],
  ["Thailand", "TH", "Asia"],
  ["Turkey", "TR", "Europe"],
  ["Ukraine", "UA", "Europe"],
  ["United Arab Emirates", "AE", "Asia"],
  ["United Kingdom", "GB", "Europe"],
  ["United States", "US", "North America"],
  ["Vietnam", "VN", "Asia"],
] as const;

function getFlag(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function hashString(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

function deterministicNumber(seed: string, min: number, max: number) {
  const hash = hashString(seed);
  return min + (hash % (max - min + 1));
}

function deterministicDecimal(seed: string, min: number, max: number) {
  const hash = hashString(seed);
  const value = min + ((hash % 1000) / 1000) * (max - min);
  return +value.toFixed(1);
}

function deterministicTrend(seed: string): Trend {
  return hashString(seed) % 2 === 0 ? "up" : "down";
}

function deterministicPolicy(seed: string): PolicyStatus {
  const options: PolicyStatus[] = ["Strong", "Moderate", "Weak", "Critical"];
  return options[hashString(seed) % options.length];
}

export const countries: CountryRanking[] = baseCountries
  .map(([name, code, region]) => {
    const score = deterministicNumber(name, 20, 90);

    return {
      rank: 0,
      flag: getFlag(code),
      name,
      slug: slugify(name),
      region,
      incomeGroup: "Mixed",
      score,
      trend: deterministicTrend(name),
      change1Y: deterministicDecimal(`${name}-change`, -2.5, 3.5),
      indicators: `${deterministicNumber(`${name}-indicators`, 5, 9)}/9`,
      policyStatus: deterministicPolicy(name),
    };
  })
  .sort((a, b) => b.score - a.score)
  .map((country, index) => ({
    ...country,
    rank: index + 1,
  }));