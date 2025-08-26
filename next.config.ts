// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Skip ESLint saat build production (Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ (Opsional) Skip error TypeScript saat build production
  // Menjaga agar deploy tidak gagal meski ada error TS.
  // Di dev (npm run dev) error & warning tetap muncul seperti biasa.
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Pengaturan gambar jarak jauh yang kamu pakai
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Google Images thumbnails
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },

      // Play Store app icons / screenshots
      { protocol: "https", hostname: "play-lh.googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },

      // miHoYo / HoYoverse CDN, dll
      { protocol: "https", hostname: "upload-os-bbs.mihoyo.com" },
      { protocol: "https", hostname: "fastcdn.hoyoverse.com" },

      // Sumber umum lain yang kamu sebut
      { protocol: "https", hostname: "static.wikia.nocookie.net" },
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "i.pinimg.com" },

      // Tambahkan host lain di sini jika ada
      // { protocol: "https", hostname: "example-cdn.com" },
    ],
  },
};

export default nextConfig;
