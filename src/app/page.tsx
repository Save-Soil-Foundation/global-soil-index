import { AboutGSI } from "@/components/AboutGSI";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { RankingsTable } from "@/components/RankingsTable";
import { RightPanel } from "@/components/RightPanel";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#031426] text-white">
      <div className="relative flex">
        <div className="pointer-events-none absolute bottom-0 left-[250px] top-0 hidden w-px bg-[rgba(94,177,255,0.25)] lg:block" />

        <Sidebar />

        <section className="min-w-0 flex-1 p-4 pt-20 sm:p-6 sm:pt-20 lg:p-6 lg:pt-6 xl:gsi-page-padding">
          <Hero />

          <PrototypeNotice />

          <div className="gsi-section-mt grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px] xl:gsi-section-gap">
            <div className="space-y-5 xl:space-y-[18px]">
              <RankingsTable />
              <AboutGSI />
            </div>

            <RightPanel />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}