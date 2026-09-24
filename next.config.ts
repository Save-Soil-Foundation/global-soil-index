import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return ["globalsoilindex.org", "www.globalsoilindex.org"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://www.soilindex.org/:path*",
      permanent: true,
    }));
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
