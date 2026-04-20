import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Before bilingual URL routing, these URLs were the site's English pages.
    // Google has already indexed some of them; preserve link equity with 301s.
    return [
      { source: "/cards", destination: "/en/cards", permanent: true },
      { source: "/cards/:id", destination: "/en/cards/:id", permanent: true },
      { source: "/reading", destination: "/en/reading", permanent: true },
      { source: "/shop", destination: "/en/shop", permanent: true },
    ];
  },
};

export default nextConfig;
