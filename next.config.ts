import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const domainRedirects = ["globalsoilindex.org", "www.globalsoilindex.org"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://www.soilindex.org/:path*",
      permanent: true,
    }));

    // Temporarily hide unfinished sections while preserving their page implementations.
    const hiddenSectionRedirects = ["/insights", "/blog", "/partnerships"].map((source) => ({
      source: `${source}/:path*`,
      destination: "/",
      permanent: false,
    }));

    return [...domainRedirects, ...hiddenSectionRedirects];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/w160/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
