// src/app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://localhost/"),
  title: {
    default: "Ciel Top Up — Top Up Game Cepat & Aman",
    template: "%s — Ciel Top Up",
  },
  description:
    "Top up MLBB, Free Fire, Genshin, HSR, Honor of Kings, dan lainnya. Bayar via QRIS, E-Wallet, atau VA. Proses cepat, aman, dan otomatis.",
  keywords: [
    "top up game",
    "topup ML",
    "topup mobile legends",
    "topup genshin",
    "topup free fire",
    "qris game",
    "e-wallet",
    "voucher game",
    "ciel top up",
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: [{ url: "/icon.png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: "https://localhost/",
    title: "Ciel Top Up — Top Up Game Cepat & Aman",
    siteName: "Ciel Top Up",
    description:
      "Top up game favorit Anda dengan QRIS/E-Wallet/VA. Proses instan & garansi pesanan.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ciel Top Up" }],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ciel Top Up — Top Up Game Cepat & Aman",
    description:
      "Top up MLBB, Free Fire, Genshin, HSR, Honor of Kings. Cepat, aman, otomatis.",
    images: ["/og.png"],
    creator: "@ciel_topup",
  },
  alternates: { canonical: "/" },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <body
        className="
          min-h-dvh bg-background text-foreground antialiased
          selection:bg-indigo-500/20 selection:text-indigo-400
        "
      >
        {/* Dekorasi background ringan */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          {/* grid lembut */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.06)_1px,transparent_1px)] bg-[size:56px_56px]" />
          {/* glow gradient */}
          <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_60%)] blur-3xl" />
          <div className="absolute bottom-[-8rem] right-[-6rem] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2),transparent_60%)] blur-3xl" />
        </div>

        {/* Skip link untuk aksesibilitas */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-neutral-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          Lewati ke konten utama
        </a>

        {/* Header glassy (hanya navbar yang sticky, TrustBar scroll biasa) */}
        <header className="sticky top-0 z-40">
          <div className="backdrop-blur-md bg-background/70 border-b border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <Navbar />
            </div>
          </div>
        </header>

        {/* TrustBar tidak sticky supaya tidak menutupi konten saat scroll */}
        <Suspense>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <TrustBar />
          </div>
        </Suspense>

        {/* Konten */}
        <main id="main" className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-16 pt-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-background/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
            <Suspense>
              <Footer />
            </Suspense>
            {/* Fallback singkat jika Footer kosong */}
            {/* <div className="text-center text-sm text-neutral-400">
              © {year} Ciel Top Up · Semua hak dilindungi.
            </div> */}
          </div>
        </footer>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ciel Top Up",
              url: "https://localhost/",
              logo: "https://localhost/icon.png",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ciel Top Up",
              url: "https://localhost/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://localhost/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
