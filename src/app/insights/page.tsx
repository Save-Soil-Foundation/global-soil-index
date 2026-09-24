import { pageMetadata } from "@/lib/seo";
import { RightPanel } from "@/components/RightPanel";

export const metadata = pageMetadata(
  "Insights | Soil Index",
  "Global soil health leaders, market movement, and research updates.",
  "/insights"
);

export default function InsightsPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="border-b border-white/10 pb-9">
        <p className="gsi-kicker">Insights</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
          Signals behind the scores.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/48">
          Track the countries gaining ground, the places under pressure, and the
          research shaping the next Global Soil Index edition.
        </p>
      </header>

      <div className="mt-10">
        <RightPanel />
      </div>
    </main>
  );
}
