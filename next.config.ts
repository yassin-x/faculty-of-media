import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
      },
    ],
    unoptimized: true,
  },
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
