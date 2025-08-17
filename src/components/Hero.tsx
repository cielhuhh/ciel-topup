"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Hero({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  return (
    <section className="bg-hero relative overflow-hidden rounded-3xl py-16 px-6 shadow-lg">
      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Top Up Game <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Cepat & Aman</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-lg text-gray-300"
        >
          Dapatkan Diamond & Voucher favorit kamu hanya dalam hitungan detik. Pembayaran aman via QRIS, E-Wallet, dan VA.
        </motion.p>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-xl bg-white/10 px-4 py-3 shadow-md backdrop-blur-md"
        >
          <Search className="h-5 w-5 text-gray-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Cari game favoritmu..."
            className="w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8"
        >
          <a
            href="#games"
            className="inline-block rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            Mulai Top Up
          </a>
        </motion.div>
      </div>
    </section>
  );
}
