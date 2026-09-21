import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountryProfileView } from "@/components/CountryProfileView";
import { getSoilDataProvider } from "@/lib/soil-data";

type CountryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const provider = getSoilDataProvider();
  const rankings = await provider.getRankings();

  return rankings.map((country) => ({
    slug: country.slug,
  }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = getSoilDataProvider();
  const profile = await provider.getCountryProfile(slug);

  if (!profile) {
    return {
      title: "Country not found | Global Soil Index",
    };
  }

  return {
    title: `${profile.country.name} Soil Health Profile | Global Soil Index`,
    description: `Prototype soil-health ranking, indicators, and data-quality notes for ${profile.country.name}.`,
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const provider = getSoilDataProvider();
  const profile = await provider.getCountryProfile(slug);

  if (!profile) {
    notFound();
  }

  return <CountryProfileView profile={profile} />;
}
