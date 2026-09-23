import {
  countries,
  datasetMetadata,
  featuredCountries,
  getCountryHistory,
  getDataQuality,
  getDataSources,
  getIndicatorValues,
  getRankingBySlug,
  globalSummary,
  indicatorDefinitions,
  tickerItems,
} from "@/data/countries";
import type {
  CountryProfile,
  CountryRanking,
  DatasetMetadata,
  GlobalSummary,
  SoilDataProvider,
  SoilIndicatorDefinition,
  SoilTickerItem,
} from "@/lib/soil-types";

function buildCountryProfile(country: CountryRanking): CountryProfile {
  return {
    country,
    scoreAvailability: country.score === null ? "unavailable" : country.dataAvailability,
    indicators: getIndicatorValues(country),
    history: getCountryHistory(country),
    sources: getDataSources(country),
    lastMeasurementDate: country.measurementDate,
    dataQuality: getDataQuality(country),
  };
}

function assertRanking(value: unknown): CountryRanking {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid country ranking response item.");
  }

  const item = value as Partial<CountryRanking>;

  if (!item.code || !item.name || !item.slug || !item.region) {
    throw new Error("Country ranking response is missing required country fields.");
  }

  return {
    code: String(item.code),
    name: String(item.name),
    slug: String(item.slug),
    region: item.region,
    flagUrl:
      item.flagUrl ??
      `https://flagcdn.com/w160/${String(item.code).toLowerCase()}.png`,
    flagAlt: item.flagAlt ?? `${item.name} flag`,
    mapPosition: item.mapPosition ?? { x: 50, y: 50 },
    rank: typeof item.rank === "number" ? item.rank : null,
    score: typeof item.score === "number" ? item.score : null,
    scoreChange: typeof item.scoreChange === "number" ? item.scoreChange : null,
    historicalChange:
      typeof item.historicalChange === "number" ? item.historicalChange : null,
    dataAvailability: item.dataAvailability ?? "partial",
    verificationStatus: item.verificationStatus ?? "api-normalized",
    measurementDate: item.measurementDate ?? null,
    sourceSummary: item.sourceSummary ?? "Normalized API response.",
    ...(typeof item.featuredOrder === "number" ? { featuredOrder: item.featuredOrder } : {}),
  };
}

export class MockSoilDataProvider implements SoilDataProvider {
  async getMetadata(): Promise<DatasetMetadata> {
    return datasetMetadata;
  }

  async getSummary(): Promise<GlobalSummary> {
    return globalSummary;
  }

  async getRankings(): Promise<CountryRanking[]> {
    return countries;
  }

  async getFeaturedRankings(): Promise<CountryRanking[]> {
    return featuredCountries;
  }

  async getTickerItems(): Promise<SoilTickerItem[]> {
    return tickerItems;
  }

  async getCountryProfile(slug: string): Promise<CountryProfile | null> {
    const country = getRankingBySlug(slug);
    return country ? buildCountryProfile(country) : null;
  }

  async getIndicators(): Promise<SoilIndicatorDefinition[]> {
    return indicatorDefinitions;
  }
}

export class ApiSoilDataProvider implements SoilDataProvider {
  constructor(private readonly baseUrl: string) {}

  private async fetchJson<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Global Soil API request failed: ${response.status}`);
    }

    return (await response.json()) as T;
  }

  async getMetadata(): Promise<DatasetMetadata> {
    const response = await this.fetchJson<Partial<DatasetMetadata>>("/metadata");

    return {
      id: response.id ?? "api-dataset",
      title: response.title ?? "Global Soil Index API dataset",
      description: response.description ?? "Normalized production API response.",
      countryCount: response.countryCount ?? 0,
      updatedAt: response.updatedAt ?? new Date(0).toISOString(),
      updateLabel: response.updateLabel ?? "API timestamp unavailable",
      statusLabel: response.statusLabel ?? "API DATA",
      provider: "api",
      sourceNote: response.sourceNote ?? "Production API source metadata unavailable.",
      apiBaseUrl: this.baseUrl,
    };
  }

  async getSummary(): Promise<GlobalSummary> {
    return this.fetchJson<GlobalSummary>("/summary");
  }

  async getRankings(): Promise<CountryRanking[]> {
    const response = await this.fetchJson<unknown[]>("/countries");
    return response.map(assertRanking);
  }

  async getFeaturedRankings(): Promise<CountryRanking[]> {
    const rankings = await this.getRankings();
    return rankings
      .filter((country) => country.featuredOrder)
      .sort((left, right) => (left.featuredOrder ?? 0) - (right.featuredOrder ?? 0));
  }

  async getTickerItems(): Promise<SoilTickerItem[]> {
    const response = await this.fetchJson<unknown[]>("/ticker");
    return response.map((item) => {
      const ranking = assertRanking(item);
      const tickerChange =
        typeof (item as Partial<SoilTickerItem>).tickerChange === "number"
          ? (item as Partial<SoilTickerItem>).tickerChange ?? null
          : ranking.scoreChange;
      return { ...ranking, tickerChange };
    });
  }

  async getCountryProfile(slug: string): Promise<CountryProfile | null> {
    try {
      return await this.fetchJson<CountryProfile>(`/countries/${slug}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes("404")) {
        return null;
      }
      throw error;
    }
  }

  async getIndicators(): Promise<SoilIndicatorDefinition[]> {
    return this.fetchJson<SoilIndicatorDefinition[]>("/indicators");
  }
}

export function getSoilDataProvider(): SoilDataProvider {
  const requestedProvider = process.env.NEXT_PUBLIC_GSI_DATA_PROVIDER;
  const apiBaseUrl = process.env.NEXT_PUBLIC_GSI_API_BASE_URL;

  if (requestedProvider === "api" && apiBaseUrl) {
    return new ApiSoilDataProvider(apiBaseUrl.replace(/\/$/, ""));
  }

  return new MockSoilDataProvider();
}

type LegacyCountryRow = Omit<CountryRanking, "score"> & {
  score: number;
  flag: string;
  change1Y: number;
};

function toLegacyCountryRow(country: CountryRanking): LegacyCountryRow {
  return {
    ...country,
    score: country.score ?? 0,
    flag: country.code,
    change1Y: country.historicalChange ?? country.scoreChange ?? 0,
  };
}

export function getAllCountries(): LegacyCountryRow[] {
  return countries.map(toLegacyCountryRow);
}

export function getCountryBySlug(slug: string) {
  const country = getRankingBySlug(slug);
  return country ? buildCountryProfile(country) : null;
}
