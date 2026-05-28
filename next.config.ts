import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.instagram.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Allow SVG placeholders
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  // Allow large file uploads (up to 100MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
