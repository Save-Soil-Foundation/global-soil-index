import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Global Soil Index (GSI) | Ranking 196 Countries by Soil Health",
  description:
    "The Global Soil Index ranks 196 countries based on soil health, transparency, and policy action. A volunteer-driven initiative aligned with the Save Soil movement.",
  keywords: [
    "Global Soil Index",
    "Soil health ranking",
    "Save Soil",
    "Soil data",
    "Agriculture sustainability",
    "Climate and soil",
    "Soil degradation",
    "Environmental index",
  ],
  authors: [{ name: "Global Soil Index Initiative" }],
  openGraph: {
    title: "Global Soil Index",
    description:
      "Ranking countries by soil health and accountability. Transparent, data-driven, and global.",
    url: "https://globalsoilindex.org",
    siteName: "Global Soil Index",
    images: [
      {
        url: "/assets/earth-hero.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}