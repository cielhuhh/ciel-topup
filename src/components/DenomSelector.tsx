"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { games } from "@/lib/games";

type Toast = { title: string; desc?: string };

type GroupKey = "topup" | "pass";
type Denom = {
  code: string;
  label: string;
  amount?: number;
  price: number;
  // optional meta di future: promoPrice, popular, etc.
};

const toIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

// Klasifikasi otomatis berdasarkan kata kunci di label
function classify(label: string): GroupKey {
  const s = label.toLowerCase();
  if (
    s.includes("pass") ||
    s.includes("starlight") ||
    s.includes("member") ||
    s.includes("weekly") ||
    s.includes("welkin") ||
    s.includes("blessing")
  )
    return "pass";
  return "topup";
}

export default function DenomSelector({
  gameId,
  onClose,
  onToast,
}: {
  gameId: string;
  onClose: () => void;
  onToast: (t: Toast) => void;
}) {
  const game = useMemo(() => games.find((g) => g.id === gameId), [gameId]);

  const [activeTab, setActiveTab] = useState<GroupKey>("topup");
  const [denomCode, setDenomCode] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState("");
  const [loading, setLoading] = useState(false);

  // Bagi denom ke 2 kelompok
  const groups = useMemo(() => {
    const topup: Denom[] = [];
    const pass: Denom[] = [];
    (game?.denoms ?? []).forEach((d) => (classify(d.label) === "pass" ? pass.push(d) : topup.push(d)));
    // Sort ringan: topup by amount/angka di label, pass biarkan urutan definisi
    const byNumber = (a: Denom, b: Denom) => {
      const na = parseInt((a.amount ?? parseInt(a.label.replace(/\D+/g, "") || "0")).toString(), 10);
      const nb = parseInt((b.amount ?? parseInt(b.label.replace(/\D+/g, "") || "0")).toString(), 10);
      return na - nb;
    };
    topup.sort(byNumber);
    return { topup, pass };
  }, [game]);

  // Reset pilihan saat pindah tab
  useEffect(() => {
    setDenomCode(null);
  }, [activeTab]);

  // Keyboard: Esc keluar, Enter lanjut bayar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handleCheckout();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, denomCode, playerId]);

  const handleCheckout = useCallback(async () => {
    if (!game) return;
    if (!denomCode) return onToast({ title: "Pilih denom dulu" });
    if (!playerId.trim()) return onToast({ title: "Player ID wajib diisi" });

    setLoading(true);
    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: game.id, denomCode, playerId }),
      }).then((r) => r.json());

      if (!orderRes.orderId) throw new Error("Gagal membuat order");

      const payRes = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderRes.orderId }),
      }).then((r) => r.json());

      if (payRes.paymentUrl) {
        onToast({ title: "Order dibuat", desc: "Mengalihkan ke halaman pembayaran..." });
        // Demo: ke halaman stepper
        window.location.href = "/checkout";
      } else {
        throw new Error("Gagal membuat sesi pembayaran");
      }
    } catch (e: any) {
      onToast({ title: "Terjadi kesalahan", desc: e?.message || "Coba lagi" });
    } finally {
      setLoading(false);
    }
  }, [game, denomCode, playerId, onToast]);

  if (!game) {
    return (
      <div className="text-sm text-red-500">
        Game tidak ditemukan. Tutup dan coba lagi.
      </div>
    );
  }

  const list = activeTab === "topup" ? groups.topup : groups.pass;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="ds-title">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div id="ds-title" className="text-base font-semibold">
            {game.name}
          </div>
          <div className="text-xs text-neutral-500">Pilih nominal/top up atau paket khusus</div>
        </div>
        <button
          onClick={onClose}
          className="rounded-xl border px-3 py-1.5 text-xs hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Tutup"
        >
          Tutup
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-3 inline-flex rounded-xl border p-1 text-xs">
        {(["topup", "pass"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setActiveTab(k)}
            className={[
              "rounded-lg px-3 py-1.5 transition",
              activeTab === k
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800",
            ].join(" ")}
          >
            {k === "topup" ? "Top Up" : "Paket / Pass"}
          </button>
        ))}
      </div>

      {/* Denoms */}
      {list.length === 0 ? (
        <div className="rounded-xl border p-4 text-sm text-neutral-500">
          Tidak ada opsi pada kategori ini.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {list.map((d) => {
            const selected = denomCode === d.code;
            return (
              <button
                key={d.code}
                onClick={() => setDenomCode(d.code)}
                className={[
                  // container
                  "group relative overflow-hidden rounded-xl border p-3 text-left transition",
                  "hover:bg-neutral-50 dark:hover:bg-neutral-800",
                  selected
                    ? "border-indigo-500/60 ring-2 ring-indigo-500/40 bg-indigo-500/10 dark:bg-indigo-400/10"
                    : "border-neutral-200 dark:border-neutral-800",
                ].join(" ")}
                aria-pressed={selected}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="line-clamp-2 text-sm font-medium leading-tight">{d.label}</div>
                  {activeTab === "pass" && (
                    <span className="rounded-full border px-2 py-0.5 text-[10px] text-neutral-500">Paket</span>
                  )}
                </div>
                <div className="mt-1 text-[12px] text-neutral-500">{toIDR(d.price)}</div>

                {/* Accent bar when selected (subtle) */}
                <div
                  className={[
                    "pointer-events-none absolute inset-x-0 bottom-0 h-0.5 transition",
                    selected ? "bg-indigo-500/60" : "bg-transparent",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Player ID */}
      <div className="mt-4">
        <label htmlFor="player-id" className="mb-1 block text-xs text-neutral-500">
          Player ID
        </label>
        <input
          id="player-id"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Contoh: 123456789(1234)"
          className="w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-neutral-400 focus:shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
        />
        <div className="mt-1 text-[11px] text-neutral-500">
          Pastikan ID sudah benar. Pesanan otomatis diproses setelah pembayaran.
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
        >
          Batal
        </button>
        <button
          disabled={loading}
          onClick={handleCheckout}
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-neutral-900"
        >
          {loading ? "Memproses..." : "Lanjut Pembayaran"}
        </button>
      </div>
    </div>
  );
}
