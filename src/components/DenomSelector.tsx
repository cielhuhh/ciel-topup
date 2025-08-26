"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { games } from "@/lib/games";
import { CheckCircle2, BadgeCheck, ChevronRight, Sparkles } from "lucide-react";

type Toast = { title: string; desc?: string };
type GroupKey = "topup" | "pass";

type Denom = { code: string; label: string; amount?: number; price: number };
type GameItem = { id: string; slug?: string; title?: string; name?: string; image?: string; denoms: Denom[] };

type Props = { gameId: string; onSelect?: (p: { game: GameItem; denom: Denom }) => void; onClose?: () => void; onToast?: (t: Toast) => void; };

const toIDR = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
const classify = (label: string): GroupKey =>
  /pass|starlight|member|weekly|welkin|blessing/i.test(label) ? "pass" : "topup";

export default function DenomSelector({ gameId, onSelect, onClose, onToast }: Props) {
  const [activeTab, setActiveTab] = useState<GroupKey>("topup");
  const [selected, setSelected] = useState<Denom | null>(null);
  const [localToast, setLocalToast] = useState<Toast | null>(null);

  const pushToast = useCallback((t: Toast) => (onToast ? onToast(t) : setLocalToast(t)), [onToast]);

  const game: GameItem | undefined = useMemo(
    () => (games as unknown as GameItem[]).find((g) => g.id === gameId || g.slug === gameId),
    [gameId]
  );

  const groups = useMemo(() => {
    const list = game?.denoms ?? [];
    return {
      topup: list.filter((d) => classify(d.label) === "topup"),
      pass: list.filter((d) => classify(d.label) === "pass"),
    } as Record<GroupKey, Denom[]>;
  }, [game]);

  useEffect(() => {
    setSelected(null);
    setActiveTab("topup");
  }, [gameId]);

  const submit = useCallback(() => {
    if (!game || !selected) {
      pushToast({ title: "Pilih salah satu denom terlebih dahulu." });
      return;
    }
    if (onSelect) onSelect({ game, denom: selected });
    else {
      const slug = game.slug || game.id;
      const qs = new URLSearchParams({ game: String(slug), code: selected.code });
      window.location.href = `/checkout?${qs.toString()}`;
    }
    onClose?.();
  }, [game, selected, onSelect, onClose, pushToast]);

  if (!game) return <div className="p-6 text-sm opacity-70">Game tidak ditemukan.</div>;
  const title = game.title ?? game.name ?? "Game";
  const counts = { topup: groups.topup.length, pass: groups.pass.length };

  return (
    <div className="w-full max-w-3xl">
<header className="mb-4 flex items-center justify-between gap-3">
  <div>
    <h2 className="text-lg font-semibold">Pilih Denom</h2>
    <p className="flex items-center gap-1 text-sm opacity-75">
      <BadgeCheck className="h-4 w-4 text-emerald-500" /> {title}
    </p>
  </div>
</header>

      <div role="tablist" aria-label="Kategori denom" className="mb-4 inline-flex overflow-hidden rounded-xl border bg-card p-1">
        {(["topup", "pass"] as const).map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              role="tab"
              aria-selected={active}
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm transition ${active ? "bg-foreground/10 font-medium" : "hover:bg-foreground/5"}`}
            >
              {tab === "topup" ? "Top Up" : "Pass / Membership"}
              <span className="ml-2 rounded-md border px-1.5 py-0.5 text-[11px] opacity-75">{counts[tab]}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {groups[activeTab].map((d) => {
          const isSel = selected?.code === d.code;
          return (
            <label
              key={d.code}
              className={`group relative cursor-pointer rounded-2xl border bg-card/60 p-3 transition hover:shadow ${
                isSel ? "border-indigo-500 ring-2 ring-indigo-400/30" : "hover:border-white/20"
              }`}
            >
              <input type="radio" name="denom" className="peer sr-only" checked={isSel} onChange={() => setSelected(d)} />
              <div className="flex min-h-[86px] flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium leading-snug">{d.label}</div>
                  {isSel ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-500" />
                  ) : (
                    <Sparkles className="h-5 w-5 shrink-0 text-white/20 group-hover:text-white/30" />
                  )}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-xs opacity-70">{typeof d.amount === "number" ? `${d.amount} unit` : "\u00A0"}</div>
                  <div className="rounded-md bg-indigo-600/15 px-2 py-1 text-[11px] font-semibold text-indigo-300">{toIDR(d.price)}</div>
                </div>
              </div>
              <ChevronRight className={`absolute right-3 top-3 h-4 w-4 transition ${isSel ? "text-indigo-400" : "text-white/20 group-hover:text-white/40"}`} />
            </label>
          );
        })}
        {groups[activeTab].length === 0 && (
          <div className="col-span-full rounded-xl border bg-card/60 p-4 text-sm opacity-80">Tidak ada denom pada kategori ini.</div>
        )}
      </div>

      <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm opacity-85">
          {selected ? (
            <>
              <span className="opacity-70">Dipilih:</span> <span className="font-medium">{selected.label}</span> ·{" "}
              <span className="font-semibold">{toIDR(selected.price)}</span>
            </>
          ) : (
            "Belum ada denom dipilih"
          )}
        </div>
        <button
          onClick={submit}
          disabled={!selected}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Lanjutkan
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {localToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl border bg-card px-4 py-2 text-sm shadow">
          <div className="font-medium">{localToast.title}</div>
          {localToast.desc && <div className="text-xs opacity-70">{localToast.desc}</div>}
          <button className="mt-2 text-xs opacity-70 hover:opacity-100" onClick={() => setLocalToast(null)}>
            Tutup
          </button>
        </div>
      )}
    </div>
  );
}
