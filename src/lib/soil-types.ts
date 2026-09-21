export type CountryRegion =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Oceania";

export type DataAvailability = "complete" | "partial" | "limited" | "unavailable";

export type VerificationStatus =
  | "visual-demo-fixture"
  | "modelled-demo"
  | "api-normalized"
  | "unavailable";

export type SoilIndicatorId =
  | "organic-carbon"
  | "erosion-risk"
  | "vegetation-cover"
  | "nutrient-balance"
  | "soil-moisture"
  | "compaction-pressure"
  | "salinity-stress"
  | "soil-biodiversity"
  | "policy-readiness";

export type SoilIndicatorDefinition = {
  id: SoilIndicatorId;
  label: string;
  description: string;
  unit: string;
  sourceType: string;
};

export type SoilIndicatorValue = SoilIndicatorDefinition & {
  value: number | null;
  confidence: DataAvailability;
  note?: string;
};

export type Country = {
  code: string;
  name: string;
  slug: string;
  region: CountryRegion;
  flagUrl: string;
  flagAlt: string;
  mapPosition: {
    x: number;
    y: number;
  };
};

export type CountryRanking = Country & {
  rank: number | null;
  score: number | null;
  scoreChange: number | null;
  historicalChange: number | null;
  dataAvailability: DataAvailability;
  verificationStatus: VerificationStatus;
  measurementDate: string | null;
  sourceSummary: string;
  featuredOrder?: number;
};

export type CountryHistoryPoint = {
  year: number;
  score: number | null;
};

export type DataSource = {
  label: string;
  description: string;
  status: DataAvailability;
};

export type CountryProfile = {
  country: CountryRanking;
  scoreAvailability: DataAvailability;
  indicators: SoilIndicatorValue[];
  history: CountryHistoryPoint[];
  sources: DataSource[];
  lastMeasurementDate: string | null;
  dataQuality: {
    status: DataAvailability;
    summary: string;
    limitations: string[];
  };
};

export type GlobalSummary = {
  countryCount: number;
  rankedCountryCount: number;
  averageScore: number | null;
  completeDataCount: number;
  partialDataCount: number;
  limitedDataCount: number;
  unavailableDataCount: number;
  leadingRegion: CountryRegion | null;
  priorityRegion: CountryRegion | null;
};

export type DatasetMetadata = {
  id: string;
  title: string;
  description: string;
  countryCount: number;
  updatedAt: string;
  updateLabel: string;
  statusLabel: string;
  provider: "mock" | "api";
  sourceNote: string;
  apiBaseUrl?: string;
};

export type SoilTickerItem = CountryRanking & {
  tickerChange: number | null;
};

export type SoilDataProvider = {
  getMetadata(): Promise<DatasetMetadata>;
  getSummary(): Promise<GlobalSummary>;
  getRankings(): Promise<CountryRanking[]>;
  getFeaturedRankings(): Promise<CountryRanking[]>;
  getTickerItems(): Promise<SoilTickerItem[]>;
  getCountryProfile(slug: string): Promise<CountryProfile | null>;
  getIndicators(): Promise<SoilIndicatorDefinition[]>;
};

export type SoilDataProviderError = {
  code: "provider_unavailable" | "validation_failed" | "not_found";
  message: string;
};
