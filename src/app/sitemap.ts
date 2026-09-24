import type { MetadataRoute } from "next";
import { getSoilDataProvider } from "@/lib/soil-data";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rankings = await getSoilDataProvider().getRankings();
  const paths = ["/", "/about", "/methodology", "/map", "/insights", "/blog", "/partnerships", "/data-api"];
  return [...paths, ...Array.from(new Set(rankings.map(({ slug }) => `/country/${slug}`)))].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
