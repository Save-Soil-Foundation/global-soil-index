import { Hero } from "@/components/Hero";
import { RankingsTable } from "@/components/RankingsTable";

export default function Home() {
  return (
    <main id="overview" className="min-h-[calc(100vh-72px)] pb-24">
      <div className="mx-auto max-w-[1600px] px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <Hero />
        <RankingsTable />
      </div>
    </main>
  );
}
