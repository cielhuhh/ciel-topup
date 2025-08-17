"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function GameCard({
  game,
  onSelect,
}: {
  game: { id: string; name: string; image: string };
  onSelect: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      aria-label={`Pilih denom untuk ${game.name}`}
      className="card hover-raise group relative overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {/* brand glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -inset-24 rounded-[40px] bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(99,102,241,.20),transparent)]" />
      </div>

      {/* thumbnail */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={game.image}
          alt={game.name}
          fill
          sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
          className="object-cover transition will-change-transform duration-300 group-hover:scale-[1.04]"
          // aman kalau CDN lambat
          placeholder="empty"
          loading="lazy"
        />
        {/* gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

        {/* tips */}
        <div className="pointer-events-none absolute bottom-0 left-0 p-3 text-white">
          <div className="text-[11px] opacity-90">Klik untuk pilih denom</div>
        </div>

        {/* badge kanan atas */}
        <div className="absolute left-3 top-3">
          <span className="chip bg-black/40 text-white/90 backdrop-blur border-white/20">
            Resmi
          </span>
        </div>
      </div>

      {/* title row */}
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="line-clamp-1 text-sm font-semibold">{game.name}</div>
        <span className="text-[10px] text-neutral-500">Ready 24/7</span>
      </div>
    </motion.button>
  );
}
