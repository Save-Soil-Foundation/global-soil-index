import { AboutGSI } from "@/components/AboutGSI";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { RankingsTable } from "@/components/RankingsTable";
import { RightPanel } from "@/components/RightPanel";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f5f1]">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <div className="px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pt-8 2xl:px-10">
            <Hero />
            <PrototypeNotice />

            <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
              <div className="min-w-0 space-y-6">
                <RankingsTable />
                <AboutGSI />
              </div>

              <RightPanel />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}
