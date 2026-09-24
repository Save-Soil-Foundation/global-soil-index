import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
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
      title: "Country not found | Soil Index",
      robots: { index: false, follow: false },
    };
  }

  return pageMetadata(
    `${profile.country.name} Soil Health Profile | Soil Index`,
    `Prototype soil-health ranking, indicators, and data-quality notes for ${profile.country.name}.`,
    `/country/${profile.country.slug}`
  );
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
