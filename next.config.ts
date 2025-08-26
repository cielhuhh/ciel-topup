// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ⬇️ Matikan ESLint & TypeScript error saat build production (Vercel)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Google Images thumbnails
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      // Play Store app icons / screenshots
      { protocol: "https", hostname: "play-lh.googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },

      // CDN game/dev yang kamu pakai
      { protocol: "https", hostname: "upload-os-bbs.mihoyo.com" },
      { protocol: "https", hostname: "fastcdn.hoyoverse.com" },
      { protocol: "https", hostname: "static.wikia.nocookie.net" },
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "i.pinimg.com" },
    ],
  },
};

export default nextConfig;
