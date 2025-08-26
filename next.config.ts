import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "play-lh.googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },

      { protocol: "https", hostname: "upload-os-bbs.mihoyo.com" },
      { protocol: "https", hostname: "fastcdn.hoyoverse.com" },

      { protocol: "https", hostname: "static.wikia.nocookie.net" },
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "i.pinimg.com" },

    ],
  },
};

export default nextConfig;
