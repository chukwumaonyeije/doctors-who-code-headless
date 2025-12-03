import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doctorswhocode.blog",
      },
      {
        protocol: "https",
        hostname: "lightslategray-turtle-256743.hostingersite.com",
      },
    ],
  },
};

export default nextConfig;
