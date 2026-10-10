import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SiteStructuredData } from "@/components/SiteStructuredData";
import { RankingsTable } from "@/components/RankingsTable";
import { getSoilDataProvider } from "@/lib/soil-data";

export const metadata = pageMetadata(
  "Soil Index | Global Soil Health Rankings & Country Profiles",
  "Explore Soil Index, a soil-health platform in development, with prototype rankings across 196 countries, country profiles, maps, and methodology.",
  "/"
);

export default async function Home() {
  const provider = getSoilDataProvider();
  const [rankings, metadata, tickerItems] = await Promise.all([
    provider.getRankings(),
    provider.getMetadata(),
    provider.getTickerItems(),
  ]);

  return (
    <main id="overview">
      <SiteStructuredData />
      <div className="px-5 pb-3 pt-5 sm:px-8 lg:px-[34px] lg:pt-6">
        <RankingsTable rankings={rankings} metadata={metadata} tickerItems={tickerItems} />
        <section aria-labelledby="soil-index-explained" className="mt-8 grid gap-8 border-t border-white/10 py-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="gsi-kicker">Understanding Soil Index</p>
            <h2 id="soil-index-explained" className="mt-3 text-2xl font-light uppercase">What is Soil Index?</h2>
            <p className="mt-4 text-sm leading-6 text-white/46">Soil Index is a platform in development that aims to make soil health visible, understandable, and actionable through country profiles, maps, and global comparisons.</p>
            <Link href="/about" className="mt-4 inline-block text-sm text-[#a7d87d] underline-offset-4 hover:underline">About Soil Index →</Link>
          </div>
          <div className="space-y-5">
            <div><h3 className="text-xs font-semibold uppercase tracking-[0.06em]">How to explore the rankings</h3><p className="mt-2 text-sm leading-6 text-white/46">Search for a country, filter by region, or open a country profile to explore its indicators and data-quality notes. The initial view highlights selected countries; search and filters cover all {metadata.countryCount} countries.</p></div>
            <div><h3 className="text-xs font-semibold uppercase tracking-[0.06em]">Are these verified soil-health rankings?</h3><p className="mt-2 text-sm leading-6 text-white/68">The current rankings and scores are demonstration data for developing the platform. They are not verified scientific measurements and should not be used to make policy, investment, or land-management decisions.</p><Link href="/methodology" className="mt-3 inline-block text-sm text-[#a7d87d] underline-offset-4 hover:underline">Read the methodology and limitations →</Link></div>
          </div>
        </section>
        <details className="group border-t border-white/10 py-5">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.06em] text-[#a7d87d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98d75d]">Browse all {metadata.countryCount} country profiles</summary>
          <nav aria-label="All country soil-health profiles" className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
            {[...rankings].sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
              <Link key={country.slug} href={`/country/${country.slug}`} className="text-xs leading-5 text-white/58 underline-offset-4 hover:text-[#a7d87d] hover:underline">{country.name} soil health</Link>
            ))}
          </nav>
        </details>
      </div>
    </main>
  );
}
