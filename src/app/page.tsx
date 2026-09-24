import { SiteStructuredData } from "@/components/SiteStructuredData";
import { RankingsTable } from "@/components/RankingsTable";
import { getSoilDataProvider } from "@/lib/soil-data";

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
      </div>
    </main>
  );
}
