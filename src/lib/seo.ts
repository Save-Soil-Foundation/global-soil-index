import type { Metadata } from "next";

export const SITE_URL = "https://soilindex.org";
export const SOCIAL_IMAGE = "/soil-index-social-v1.jpg";

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Soil Index",
      title,
      description,
      url,
      images: [{
        url: new URL(SOCIAL_IMAGE, SITE_URL).toString(),
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Soil Index — Understanding the world’s soil health. Earth from orbit. soilindex.org",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{
        url: new URL(SOCIAL_IMAGE, SITE_URL).toString(),
        alt: "Soil Index — Understanding the world’s soil health",
      }],
    },
  };
}
