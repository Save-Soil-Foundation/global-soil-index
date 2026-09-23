import type {
  CountryRanking,
  CountryRegion,
  DataAvailability,
  DatasetMetadata,
  GlobalSummary,
  SoilIndicatorDefinition,
  SoilIndicatorValue,
  SoilTickerItem,
} from "@/lib/soil-types";

type CountrySeed = readonly [name: string, code: string, region: CountryRegion];

export const baseCountries = [
  ["Algeria", "DZ", "Africa"],
  ["Angola", "AO", "Africa"],
  ["Benin", "BJ", "Africa"],
  ["Botswana", "BW", "Africa"],
  ["Burkina Faso", "BF", "Africa"],
  ["Burundi", "BI", "Africa"],
  ["Cabo Verde", "CV", "Africa"],
  ["Cameroon", "CM", "Africa"],
  ["Central African Republic", "CF", "Africa"],
  ["Chad", "TD", "Africa"],
  ["Comoros", "KM", "Africa"],
  ["Cote d'Ivoire", "CI", "Africa"],
  ["DR Congo", "CD", "Africa"],
  ["Djibouti", "DJ", "Africa"],
  ["Egypt", "EG", "Africa"],
  ["Equatorial Guinea", "GQ", "Africa"],
  ["Eritrea", "ER", "Africa"],
  ["Eswatini", "SZ", "Africa"],
  ["Ethiopia", "ET", "Africa"],
  ["Gabon", "GA", "Africa"],
  ["Gambia", "GM", "Africa"],
  ["Ghana", "GH", "Africa"],
  ["Guinea", "GN", "Africa"],
  ["Guinea-Bissau", "GW", "Africa"],
  ["Kenya", "KE", "Africa"],
  ["Lesotho", "LS", "Africa"],
  ["Liberia", "LR", "Africa"],
  ["Libya", "LY", "Africa"],
  ["Madagascar", "MG", "Africa"],
  ["Malawi", "MW", "Africa"],
  ["Mali", "ML", "Africa"],
  ["Mauritania", "MR", "Africa"],
  ["Mauritius", "MU", "Africa"],
  ["Morocco", "MA", "Africa"],
  ["Mozambique", "MZ", "Africa"],
  ["Namibia", "NA", "Africa"],
  ["Niger", "NE", "Africa"],
  ["Nigeria", "NG", "Africa"],
  ["Republic of the Congo", "CG", "Africa"],
  ["Rwanda", "RW", "Africa"],
  ["Sao Tome and Principe", "ST", "Africa"],
  ["Senegal", "SN", "Africa"],
  ["Seychelles", "SC", "Africa"],
  ["Sierra Leone", "SL", "Africa"],
  ["Somalia", "SO", "Africa"],
  ["South Africa", "ZA", "Africa"],
  ["South Sudan", "SS", "Africa"],
  ["Sudan", "SD", "Africa"],
  ["Tanzania", "TZ", "Africa"],
  ["Togo", "TG", "Africa"],
  ["Tunisia", "TN", "Africa"],
  ["Uganda", "UG", "Africa"],
  ["Zambia", "ZM", "Africa"],
  ["Zimbabwe", "ZW", "Africa"],
  ["Afghanistan", "AF", "Asia"],
  ["Armenia", "AM", "Asia"],
  ["Azerbaijan", "AZ", "Asia"],
  ["Bahrain", "BH", "Asia"],
  ["Bangladesh", "BD", "Asia"],
  ["Bhutan", "BT", "Asia"],
  ["Brunei", "BN", "Asia"],
  ["Cambodia", "KH", "Asia"],
  ["China", "CN", "Asia"],
  ["Cyprus", "CY", "Asia"],
  ["Georgia", "GE", "Asia"],
  ["India", "IN", "Asia"],
  ["Indonesia", "ID", "Asia"],
  ["Iran", "IR", "Asia"],
  ["Iraq", "IQ", "Asia"],
  ["Israel", "IL", "Asia"],
  ["Japan", "JP", "Asia"],
  ["Jordan", "JO", "Asia"],
  ["Kazakhstan", "KZ", "Asia"],
  ["Kuwait", "KW", "Asia"],
  ["Kyrgyzstan", "KG", "Asia"],
  ["Laos", "LA", "Asia"],
  ["Lebanon", "LB", "Asia"],
  ["Malaysia", "MY", "Asia"],
  ["Maldives", "MV", "Asia"],
  ["Mongolia", "MN", "Asia"],
  ["Myanmar", "MM", "Asia"],
  ["Nepal", "NP", "Asia"],
  ["North Korea", "KP", "Asia"],
  ["Oman", "OM", "Asia"],
  ["Pakistan", "PK", "Asia"],
  ["Palestine", "PS", "Asia"],
  ["Philippines", "PH", "Asia"],
  ["Qatar", "QA", "Asia"],
  ["Saudi Arabia", "SA", "Asia"],
  ["Singapore", "SG", "Asia"],
  ["South Korea", "KR", "Asia"],
  ["Sri Lanka", "LK", "Asia"],
  ["Syria", "SY", "Asia"],
  ["Taiwan", "TW", "Asia"],
  ["Tajikistan", "TJ", "Asia"],
  ["Thailand", "TH", "Asia"],
  ["Timor-Leste", "TL", "Asia"],
  ["Turkey", "TR", "Asia"],
  ["Turkmenistan", "TM", "Asia"],
  ["United Arab Emirates", "AE", "Asia"],
  ["Uzbekistan", "UZ", "Asia"],
  ["Vietnam", "VN", "Asia"],
  ["Yemen", "YE", "Asia"],
  ["Albania", "AL", "Europe"],
  ["Andorra", "AD", "Europe"],
  ["Austria", "AT", "Europe"],
  ["Belarus", "BY", "Europe"],
  ["Belgium", "BE", "Europe"],
  ["Bosnia and Herzegovina", "BA", "Europe"],
  ["Bulgaria", "BG", "Europe"],
  ["Croatia", "HR", "Europe"],
  ["Czechia", "CZ", "Europe"],
  ["Denmark", "DK", "Europe"],
  ["Estonia", "EE", "Europe"],
  ["Finland", "FI", "Europe"],
  ["France", "FR", "Europe"],
  ["Germany", "DE", "Europe"],
  ["Greece", "GR", "Europe"],
  ["Hungary", "HU", "Europe"],
  ["Iceland", "IS", "Europe"],
  ["Ireland", "IE", "Europe"],
  ["Italy", "IT", "Europe"],
  ["Latvia", "LV", "Europe"],
  ["Liechtenstein", "LI", "Europe"],
  ["Lithuania", "LT", "Europe"],
  ["Luxembourg", "LU", "Europe"],
  ["Malta", "MT", "Europe"],
  ["Moldova", "MD", "Europe"],
  ["Monaco", "MC", "Europe"],
  ["Montenegro", "ME", "Europe"],
  ["Netherlands", "NL", "Europe"],
  ["North Macedonia", "MK", "Europe"],
  ["Norway", "NO", "Europe"],
  ["Poland", "PL", "Europe"],
  ["Portugal", "PT", "Europe"],
  ["Romania", "RO", "Europe"],
  ["Russia", "RU", "Europe"],
  ["San Marino", "SM", "Europe"],
  ["Serbia", "RS", "Europe"],
  ["Slovakia", "SK", "Europe"],
  ["Slovenia", "SI", "Europe"],
  ["Spain", "ES", "Europe"],
  ["Sweden", "SE", "Europe"],
  ["Switzerland", "CH", "Europe"],
  ["Ukraine", "UA", "Europe"],
  ["United Kingdom", "GB", "Europe"],
  ["Vatican City", "VA", "Europe"],
  ["Antigua and Barbuda", "AG", "North America"],
  ["Bahamas", "BS", "North America"],
  ["Barbados", "BB", "North America"],
  ["Belize", "BZ", "North America"],
  ["Canada", "CA", "North America"],
  ["Costa Rica", "CR", "North America"],
  ["Cuba", "CU", "North America"],
  ["Dominica", "DM", "North America"],
  ["Dominican Republic", "DO", "North America"],
  ["El Salvador", "SV", "North America"],
  ["Grenada", "GD", "North America"],
  ["Guatemala", "GT", "North America"],
  ["Haiti", "HT", "North America"],
  ["Honduras", "HN", "North America"],
  ["Jamaica", "JM", "North America"],
  ["Mexico", "MX", "North America"],
  ["Nicaragua", "NI", "North America"],
  ["Panama", "PA", "North America"],
  ["Saint Kitts and Nevis", "KN", "North America"],
  ["Saint Lucia", "LC", "North America"],
  ["Saint Vincent and the Grenadines", "VC", "North America"],
  ["Trinidad and Tobago", "TT", "North America"],
  ["United States", "US", "North America"],
  ["Argentina", "AR", "South America"],
  ["Bolivia", "BO", "South America"],
  ["Brazil", "BR", "South America"],
  ["Chile", "CL", "South America"],
  ["Colombia", "CO", "South America"],
  ["Ecuador", "EC", "South America"],
  ["Guyana", "GY", "South America"],
  ["Paraguay", "PY", "South America"],
  ["Peru", "PE", "South America"],
  ["Suriname", "SR", "South America"],
  ["Uruguay", "UY", "South America"],
  ["Venezuela", "VE", "South America"],
  ["Australia", "AU", "Oceania"],
  ["Fiji", "FJ", "Oceania"],
  ["Kiribati", "KI", "Oceania"],
  ["Marshall Islands", "MH", "Oceania"],
  ["Micronesia", "FM", "Oceania"],
  ["Nauru", "NR", "Oceania"],
  ["New Zealand", "NZ", "Oceania"],
  ["Palau", "PW", "Oceania"],
  ["Papua New Guinea", "PG", "Oceania"],
  ["Samoa", "WS", "Oceania"],
  ["Solomon Islands", "SB", "Oceania"],
  ["Tonga", "TO", "Oceania"],
  ["Tuvalu", "TV", "Oceania"],
  ["Vanuatu", "VU", "Oceania"],
] as const satisfies readonly CountrySeed[];

export const indicatorDefinitions: SoilIndicatorDefinition[] = [
  {
    id: "organic-carbon",
    label: "Soil organic carbon",
    description: "Carbon storage and biological productivity in managed and natural soils.",
    unit: "index score",
    sourceType: "Remote sensing and reported national inventories",
  },
  {
    id: "erosion-risk",
    label: "Erosion risk",
    description: "Exposure to water, wind, and land-use-driven soil loss.",
    unit: "index score",
    sourceType: "Terrain, rainfall, land cover, and soil pressure layers",
  },
  {
    id: "vegetation-cover",
    label: "Vegetation cover",
    description: "Protective living cover observed across seasonal cycles.",
    unit: "index score",
    sourceType: "Satellite vegetation and land-cover observations",
  },
  {
    id: "nutrient-balance",
    label: "Nutrient balance",
    description: "Availability and stability of essential soil nutrients.",
    unit: "index score",
    sourceType: "Modelled nutrient balance and national reporting",
  },
  {
    id: "soil-moisture",
    label: "Soil moisture",
    description: "Water availability and resilience through dry periods.",
    unit: "index score",
    sourceType: "Soil-moisture anomalies and hydroclimate products",
  },
  {
    id: "compaction-pressure",
    label: "Compaction pressure",
    description: "Physical constraints on roots, water movement, and soil organisms.",
    unit: "index score",
    sourceType: "Land-use intensity and soil physical risk proxies",
  },
  {
    id: "salinity-stress",
    label: "Salinity stress",
    description: "Salt accumulation that limits productive soil function.",
    unit: "index score",
    sourceType: "Global salinity risk and irrigation pressure layers",
  },
  {
    id: "soil-biodiversity",
    label: "Soil biodiversity",
    description: "Biological diversity supporting living soil systems.",
    unit: "index score",
    sourceType: "Biodiversity models and habitat pressure indicators",
  },
  {
    id: "policy-readiness",
    label: "Policy readiness",
    description: "National monitoring, targets, and restoration commitments.",
    unit: "index score",
    sourceType: "Open policy, monitoring, and restoration records",
  },
];

type FeaturedFixture = {
  rank: number;
  name: string;
  score: number;
};

const featuredFixtureRows: FeaturedFixture[] = [
  { rank: 1, name: "Switzerland", score: 84.7 },
  { rank: 2, name: "Netherlands", score: 82.1 },
  { rank: 3, name: "Denmark", score: 81.0 },
  { rank: 4, name: "Norway", score: 79.3 },
  { rank: 5, name: "Finland", score: 78.6 },
  { rank: 6, name: "France", score: 76.4 },
  { rank: 7, name: "Austria", score: 75.6 },
  { rank: 8, name: "Sweden", score: 74.8 },
  { rank: 9, name: "Ireland", score: 73.9 },
  { rank: 10, name: "Germany", score: 72.5 },
  { rank: 11, name: "Australia", score: 71.8 },
  { rank: 12, name: "New Zealand", score: 70.9 },
  { rank: 13, name: "United States", score: 67.3 },
  { rank: 14, name: "United Kingdom", score: 66.1 },
  { rank: 15, name: "Japan", score: 64.7 },
  { rank: 16, name: "Spain", score: 63.4 },
  { rank: 17, name: "Portugal", score: 62.3 },
  { rank: 18, name: "Italy", score: 61.9 },
  { rank: 19, name: "South Korea", score: 61.2 },
  { rank: 20, name: "Singapore", score: 60.8 },
  { rank: 38, name: "India", score: 61.2 },
  { rank: 49, name: "China", score: 52.8 },
  { rank: 55, name: "Brazil", score: 59.8 },
  { rank: 65, name: "Indonesia", score: 51.3 },
  { rank: 66, name: "Mexico", score: 50.7 },
  { rank: 67, name: "South Africa", score: 48.9 },
  { rank: 71, name: "Turkey", score: 47.2 },
  { rank: 74, name: "Thailand", score: 46.0 },
  { rank: 96, name: "Vietnam", score: 41.0 },
  { rank: 98, name: "Philippines", score: 39.8 },
  { rank: 110, name: "Pakistan", score: 37.9 },
  { rank: 113, name: "Bangladesh", score: 36.6 },
  { rank: 123, name: "Nigeria", score: 34.1 },
  { rank: 125, name: "Egypt", score: 33.5 },
  { rank: 129, name: "Kenya", score: 32.1 },
  { rank: 135, name: "Ethiopia", score: 30.4 },
  { rank: 137, name: "DR Congo", score: 29.8 },
  { rank: 174, name: "Afghanistan", score: 19.2 },
  { rank: 190, name: "Chad", score: 15.1 },
  { rank: 196, name: "Niger", score: 13.6 },
];

const tickerReference: Array<{ name: string; change: number }> = [
  { name: "India", change: 1.1 },
  { name: "Brazil", change: -0.3 },
  { name: "Switzerland", change: 0.4 },
  { name: "China", change: -0.6 },
  { name: "United States", change: -0.1 },
  { name: "Kenya", change: 0.2 },
  { name: "Australia", change: 0.3 },
  { name: "Nigeria", change: -0.2 },
];

const fixtureByName = new Map<string, FeaturedFixture>(
  featuredFixtureRows.map((country) => [country.name, country])
);
const featuredOrderByName = new Map<string, number>(
  featuredFixtureRows.map((country, index) => [country.name, index + 1])
);

export const datasetMetadata: DatasetMetadata = {
  id: "gsi-visual-2026-05-26",
  title: "Global Soil Index visual dataset",
  description:
    "Stable mock data used to reproduce the approved frontend and exercise future API integration paths.",
  countryCount: baseCountries.length,
  updatedAt: "2026-05-26T10:30:00.000Z",
  updateLabel: "26 May 2026, 10:30 UTC",
  statusLabel: "Dataset",
  provider: "mock",
  sourceNote:
    "Rankings and scores are prototype fixtures for interface development. They are not verified scientific country rankings.",
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function hashString(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

function deterministicDecimal(seed: string, min: number, max: number) {
  const ratio = (hashString(seed) % 10000) / 10000;
  return Number((min + ratio * (max - min)).toFixed(1));
}

function scoreForRank(name: string, rank: number) {
  const fixture = fixtureByName.get(name);

  if (fixture) return fixture.score;

  const modelled = 87 - rank * 0.36 + deterministicDecimal(`${name}-score`, -2.4, 2.4);
  return Number(Math.min(84.4, Math.max(13.9, modelled)).toFixed(1));
}

function availabilityForCountry(name: string): DataAvailability {
  if (fixtureByName.has(name)) return "complete";

  const bucket = hashString(`${name}-availability`) % 10;
  if (bucket <= 3) return "complete";
  if (bucket <= 6) return "partial";
  return "limited";
}

const regionBounds: Record<
  CountryRegion,
  { x: [number, number]; y: [number, number] }
> = {
  Africa: { x: [48, 61], y: [44, 76] },
  Asia: { x: [57, 84], y: [24, 67] },
  Europe: { x: [45, 61], y: [20, 38] },
  "North America": { x: [13, 34], y: [22, 51] },
  "South America": { x: [31, 43], y: [55, 84] },
  Oceania: { x: [78, 91], y: [64, 82] },
};

function mapPosition(name: string, region: CountryRegion) {
  const bounds = regionBounds[region];
  return {
    x: deterministicDecimal(`${name}-x`, bounds.x[0], bounds.x[1]),
    y: deterministicDecimal(`${name}-y`, bounds.y[0], bounds.y[1]),
  };
}

const usedFixtureRanks = new Set<number>(featuredFixtureRows.map((country) => country.rank));
const openRanks = Array.from({ length: baseCountries.length }, (_, index) => index + 1).filter(
  (rank) => !usedFixtureRanks.has(rank)
);
const nonFixtureSeeds = baseCountries
  .filter(([name]) => !fixtureByName.has(name))
  .sort(([leftName], [rightName]) => hashString(rightName) - hashString(leftName));

const assignedRanks = new Map<string, number>(
  featuredFixtureRows.map((country) => [country.name, country.rank])
);

nonFixtureSeeds.forEach(([name], index) => {
  assignedRanks.set(name, openRanks[index]);
});

function buildRanking([name, code, region]: CountrySeed): CountryRanking {
  const rank = assignedRanks.get(name) ?? null;
  const score = rank ? scoreForRank(name, rank) : null;
  const dataAvailability = availabilityForCountry(name);
  const scoreChange = deterministicDecimal(`${name}-daily-change`, -0.9, 1.2);
  const historicalChange =
    dataAvailability === "limited"
      ? null
      : deterministicDecimal(`${name}-history-change`, -3.4, 4.5);
  const featuredOrder = featuredOrderByName.get(name);

  return {
    code,
    name,
    slug: slugify(name),
    region,
    flagUrl: `https://flagcdn.com/w160/${code.toLowerCase()}.png`,
    flagAlt: `${name} flag`,
    mapPosition: mapPosition(name, region),
    rank,
    score,
    scoreChange,
    historicalChange,
    dataAvailability,
    verificationStatus: fixtureByName.has(name) ? "visual-fixture" : "modelled-estimate",
    measurementDate: "2026-05-26",
    sourceSummary:
      dataAvailability === "complete"
        ? "Prototype composite with all nine indicator families available."
        : dataAvailability === "partial"
          ? "Prototype composite with at least one indicator family marked partial."
          : "Prototype composite with limited historical or indicator coverage.",
    ...(featuredOrder ? { featuredOrder } : {}),
  };
}

export const countries: CountryRanking[] = baseCountries
  .map((seed) => buildRanking(seed))
  .sort((left, right) => (left.rank ?? 999) - (right.rank ?? 999));

export const featuredCountries: CountryRanking[] = countries
  .filter((country) => country.featuredOrder)
  .sort((left, right) => (left.featuredOrder ?? 0) - (right.featuredOrder ?? 0));

export function getRankingBySlug(slug: string) {
  return countries.find((country) => country.slug === slug) ?? null;
}

export function getRankingByName(name: string) {
  return countries.find((country) => country.name === name) ?? null;
}

export function getIndicatorValues(country: CountryRanking): SoilIndicatorValue[] {
  return indicatorDefinitions.map((definition, index) => {
    const unavailable =
      country.dataAvailability === "limited" && index % 3 === 0
        ? true
        : country.dataAvailability === "partial" && index % 5 === 0;

    return {
      ...definition,
      value: unavailable
        ? null
        : deterministicDecimal(`${country.name}-${definition.id}`, 28, 92),
      confidence: unavailable ? "unavailable" : country.dataAvailability,
      note: unavailable
        ? "No reliable prototype value is available for this indicator family."
        : undefined,
    };
  });
}

export function getCountryHistory(country: CountryRanking) {
  const years = [2021, 2022, 2023, 2024, 2025, 2026];
  const currentScore = country.score;
  const historicalChange = country.historicalChange;

  if (currentScore === null || historicalChange === null) {
    return years.map((year, index) => ({
      year,
      score: index === years.length - 1 ? currentScore : null,
    }));
  }

  return years.map((year, index) => {
    if (index === years.length - 1) {
      return { year, score: currentScore };
    }

    const progress = index / (years.length - 1);
    const baseline = currentScore - historicalChange;
    const score = baseline + historicalChange * progress;
    const variation = deterministicDecimal(`${country.name}-${year}`, -1.1, 1.1);
    return { year, score: Number(Math.max(0, Math.min(100, score + variation)).toFixed(1)) };
  });
}

export function getDataSources(country: CountryRanking) {
  return [
    {
      label: "Remote sensing layers",
      description:
        "Prototype vegetation, moisture, land-cover, and terrain-derived indicators.",
      status: country.dataAvailability,
    },
    {
      label: "Reported national datasets",
      description:
        "Placeholder adapter for future national soil inventories and verified submissions.",
      status: country.dataAvailability === "complete" ? "partial" : "limited",
    },
    {
      label: "Policy and restoration records",
      description:
        "Open policy signals used to exercise the policy-readiness indicator UI.",
      status: "partial",
    },
  ] satisfies { label: string; description: string; status: DataAvailability }[];
}

export function getDataQuality(country: CountryRanking) {
  const limitations = [
    "Prototype scores are interface fixtures and should not be cited as verified science.",
    "Ground observations, calibration methods, and production uncertainty estimates are not connected yet.",
  ];

  if (country.historicalChange === null) {
    limitations.push("Historical change is unavailable for this country in the mock dataset.");
  }

  if (country.dataAvailability !== "complete") {
    limitations.push("One or more indicator families have partial or limited prototype coverage.");
  }

  return {
    status: country.dataAvailability,
    summary:
      country.dataAvailability === "complete"
        ? "All UI-required prototype fields are present. Scientific verification is still pending."
        : country.dataAvailability === "partial"
          ? "Core ranking fields are present, with some partial indicator coverage."
          : "Core ranking fields are present, but historical or indicator coverage is limited.",
    limitations,
  };
}

const referenceTickerItems: SoilTickerItem[] = tickerReference.flatMap((item) => {
  const country = getRankingByName(item.name);
  return country ? [{ ...country, tickerChange: item.change }] : [];
});
const referenceTickerNames = new Set(tickerReference.map((item) => item.name));

export const tickerItems: SoilTickerItem[] = [
  ...referenceTickerItems,
  ...countries
    .filter((country) => !referenceTickerNames.has(country.name))
    .map((country) => ({ ...country, tickerChange: country.scoreChange })),
];

export const globalSummary: GlobalSummary = (() => {
  const scoredCountries = countries.filter((country) => country.score !== null);
  const averageScore =
    scoredCountries.reduce((total, country) => total + (country.score ?? 0), 0) /
    scoredCountries.length;
  const regionAverages = Array.from(
    new Set(countries.map((country) => country.region))
  ).map((region) => {
    const regionCountries = countries.filter(
      (country) => country.region === region && country.score !== null
    );
    return {
      region,
      average:
        regionCountries.reduce((total, country) => total + (country.score ?? 0), 0) /
        regionCountries.length,
    };
  });

  const leadingRegion =
    [...regionAverages].sort((left, right) => right.average - left.average)[0]?.region ?? null;
  const priorityRegion =
    [...regionAverages].sort((left, right) => left.average - right.average)[0]?.region ?? null;

  return {
    countryCount: countries.length,
    rankedCountryCount: scoredCountries.length,
    averageScore: Number(averageScore.toFixed(1)),
    completeDataCount: countries.filter((country) => country.dataAvailability === "complete")
      .length,
    partialDataCount: countries.filter((country) => country.dataAvailability === "partial")
      .length,
    limitedDataCount: countries.filter((country) => country.dataAvailability === "limited")
      .length,
    unavailableDataCount: countries.filter(
      (country) => country.dataAvailability === "unavailable"
    ).length,
    leadingRegion,
    priorityRegion,
  };
})();
