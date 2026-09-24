import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata(
    "Soil Index | Global Soil Health Intelligence",
    "Explore soil health, country profiles, and the Global Soil Index initiative. Discover our methodology and the prototype dashboard."
  ),
  applicationName: "Soil Index",
  keywords: ["Soil Index", "Global Soil Index", "soil health", "soil health indicators", "soil data", "soil degradation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2WFG7HPR82"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2WFG7HPR82');`}
        </Script>
        <div className="flex min-h-screen flex-col bg-[#0b1114] text-[#f4f5f4]">
          <Sidebar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
