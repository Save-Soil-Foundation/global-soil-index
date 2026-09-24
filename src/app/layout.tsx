import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://globalsoilindex.org"),
  title: "Global Soil Index (GSI) | Ranking 196 Countries by Soil Health",
  description:
    "The Global Soil Index ranks 196 countries based on soil health, transparency, and policy action. A volunteer-driven global soil data initiative.",
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
  alternates: {
    canonical: "https://globalsoilindex.org",
  },
  openGraph: {
    title: "Global Soil Index",
    description:
      "Ranking countries by soil health and accountability. Transparent, data-driven, and global.",
    url: "https://globalsoilindex.org",
    siteName: "Global Soil Index",
    images: [
      {
        url: "/og-dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Global Soil Index dashboard preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Soil Index",
    description:
      "Ranking countries by soil health and accountability. Transparent, data-driven, and global.",
    images: ["/og-dashboard.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col bg-[#0b1114] text-[#f4f5f4]">
          <Sidebar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
