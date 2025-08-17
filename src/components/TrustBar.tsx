// src/components/TrustBar.tsx
"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Clock3, CreditCard } from "lucide-react";

type Props = { sticky?: boolean };

// global flag di window untuk cegah double-mount
declare global {
  interface Window {
    __CIEL_TRUSTBAR_MOUNTED__?: boolean;
  }
}

export default function TrustBar({ sticky = false }: Props) {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // kalau sudah pernah mount, jangan render lagi
    if (window.__CIEL_TRUSTBAR_MOUNTED__) {
      setCanRender(false);
      return;
    }
    window.__CIEL_TRUSTBAR_MOUNTED__ = true;
    setCanRender(true);

    // optional: kalau komponen dibongkar, hapus flag
    return () => {
      window.__CIEL_TRUSTBAR_MOUNTED__ = false;
    };
  }, []);

  if (!canRender) return null;

  return (
    <div
      className={[
        sticky ? "sticky top-[88px] z-20" : "",
        "rounded-2xl border border-white/10 bg-black/40 p-3 ring-1 ring-white/5",
      ].join(" ")}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5">
          <CreditCard className="size-5 opacity-80" />
          <div>
            <div className="text-sm font-medium">Pembayaran Lengkap</div>
            <div className="text-xs text-white/60">QRIS, E-Wallet, VA</div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5">
          <ShieldCheck className="size-5 opacity-80" />
          <div>
            <div className="text-sm font-medium">Keamanan Terverifikasi</div>
            <div className="text-xs text-white/60">Webhook + Idempotensi</div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5">
          <Clock3 className="size-5 opacity-80" />
          <div>
            <div className="text-sm font-medium">Otomatis 24/7</div>
            <div className="text-xs text-white/60">Proses &lt; 1 menit*</div>
          </div>
        </div>
      </div>
    </div>
  );
}
