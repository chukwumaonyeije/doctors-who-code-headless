import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doctorswhocode.blog",
      },
    ],
  },
};

export default nextConfig;
