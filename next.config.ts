import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "freight.cargo.site"
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**"
      }
    ]
  }
};

export default nextConfig;
