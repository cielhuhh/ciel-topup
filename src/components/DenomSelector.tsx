"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { games } from "@/lib/games";

/** ===== Types ===== */
type Toast = { title: string; desc?: string };
type GroupKey = "topup" | "pass";

type Denom = {
  code: string;
  label: string;
  amount?: number;
  price: number;
};

type GameItem = {
  id: string;          // atau slug — sesuaikan dengan lib/games.ts
  slug?: string;
  title?: string;      // beberapa list pakai name, beberapa pakai title
  name?: string;
  image?: string;
  denoms: Denom[];
};

type Props = {
  gameId: string;
  onSelect?: (payload: { game: GameItem; denom: Denom }) => void;
  onClose?: () => void;
  onToast?: (t: Toast) => void; // <— tambahan agar cocok dengan HomeClient
};

/** ===== Helpers ===== */
const toIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

/** Klasifikasi otomatis berdasarkan label */
function classify(label: string): GroupKey {
  const s = label.toLowerCase();
  if (
    s.includes("pass") ||
    s.includes("starlight") ||
    s.includes("member") ||
    s.includes("weekly") ||
    s.includes("welkin") ||
    s.includes("blessing")
  ) {
    return "pass";
  }
  return "topup";
}

/** ===== Component ===== */
export default function DenomSelector({ gameId, onSelect, onClose, onToast }: Props) {
  const [activeTab, setActiveTab] = useState<GroupKey>("topup");
  const [selected, setSelected] = useState<Denom | null>(null);
  const [localToast, setLocalToast] = useState<Toast | null>(null);

  const pushToast = useCallback(
    (t: Toast) => {
      if (onToast) onToast(t);
      else setLocalToast(t);
    },
    [onToast]
  );

  // cari game by id/slug
  const game: GameItem | undefined = useMemo(() => {
    const list = games as unknown as GameItem[];
    return list.find((g) => g.id === gameId || g.slug === gameId);
  }, [gameId]);

  // bagi denom ke grup
  const groups = useMemo(() => {
    const list = game?.denoms ?? [];
    return {
      topup: list.filter((d) => classify(d.label) === "topup"),
      pass: list.filter((d) => classify(d.label) === "pass"),
    } as Record<GroupKey, Denom[]>;
  }, [game]);

  useEffect(() => {
    // reset saat ganti game
    setSelected(null);
    setActiveTab("topup");
  }, [gameId]);

  const submit = useCallback(() => {
    if (!game || !selected) {
      pushToast({ title: "Pilih salah satu denom terlebih dahulu." });
      return;
    }

    if (onSelect) {
      onSelect({ game, denom: selected });
    } else {
      // default behaviour: navigate ke checkout
      const slug = game.slug || game.id;
      const qs = new URLSearchParams({ game: String(slug), code: selected.code });
      window.location.href = `/checkout?${qs.toString()}`;
    }
    onClose?.();
  }, [game, selected, onSelect, onClose, pushToast]);

  if (!game) {
    return (
      <div className="p-6">
        <p className="text-sm opacity-70">Game tidak ditemukan.</p>
      </div>
    );
  }

  const title = game.title ?? game.name ?? "Game";

  return (
    <div className="w-full max-w-3xl">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Pilih Denom</h2>
          <p className="text-sm opacity-70">{title}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded-xl px-3 py-2 border hover:bg-foreground/5">
            Tutup
          </button>
        )}
      </header>

      {/* Tabs */}
      <div className="mb-4 inline-flex rounded-xl border bg-card p-1">
        {(["topup", "pass"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              activeTab === tab ? "bg-foreground/10 font-medium" : "hover:bg-foreground/5"
            }`}
          >
            {tab === "topup" ? "Top Up" : "Pass / Membership"}
          </button>
        ))}
      </div>

      {/* Grid denom */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {groups[activeTab].map((d) => {
          const isSel = selected?.code === d.code;
          return (
            <button
              key={d.code}
              onClick={() => setSelected(d)}
              className={`text-left rounded-2xl border p-3 transition hover:shadow focus:outline-none ${
                isSel ? "border-primary ring-2 ring-primary/30" : ""
              }`}
            >
              <div className="font-medium">{d.label}</div>
              {typeof d.amount === "number" && (
                <div className="text-xs opacity-70">{d.amount} unit</div>
              )}
              <div className="mt-1 font-semibold">{toIDR(d.price)}</div>
            </button>
          );
        })}
        {groups[activeTab].length === 0 && (
          <div className="col-span-full text-sm opacity-70">Tidak ada denom pada kategori ini.</div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <div className="text-sm opacity-80">
          {selected ? (
            <>
              <span className="opacity-70">Dipilih:</span>{" "}
              <span className="font-medium">{selected.label}</span> ·{" "}
              <span className="font-semibold">{toIDR(selected.price)}</span>
            </>
          ) : (
            "Belum ada denom dipilih"
          )}
        </div>
        <button onClick={submit} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500">
          Lanjutkan
        </button>
      </div>

      {/* Fallback toast lokal (dipakai jika onToast tidak diberikan) */}
      {localToast && (
        <div className="fixed bottom-4 right-4 rounded-xl border bg-card px-4 py-2 shadow">
          <div className="text-sm font-medium">{localToast.title}</div>
          {localToast.desc && <div className="text-xs opacity-70">{localToast.desc}</div>}
          <button
            className="mt-2 text-xs opacity-70 hover:opacity-100"
            onClick={() => setLocalToast(null)}
          >
            Tutup
          </button>
        </div>
      )}
    </div>
  );
}
