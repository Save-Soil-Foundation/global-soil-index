import type { Metadata } from "next";
import { BlogSection } from "@/components/BlogSection";

export const metadata: Metadata = {
  title: "Blog | Global Soil Index",
  description:
    "Soil health explainers, methodology notes, data-quality articles, and Global Soil Index updates.",
};

export default function BlogPage() {
  return (
    <main className="gsi-animate-page mx-auto min-h-[calc(100vh-96px)] max-w-[1400px] px-5 py-8 sm:px-8 lg:px-[34px] lg:py-10">
      <header className="border-b border-white/10 pb-8">
        <p className="gsi-kicker">Blog</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-light uppercase leading-[1.05] sm:text-5xl">
          Soil health explainers and index updates.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/48">
          Methodology notes, data-quality explainers, map stories, and editorial
          updates for people following the Global Soil Index.
        </p>
      </header>

      <BlogSection />
    </main>
  );
}
