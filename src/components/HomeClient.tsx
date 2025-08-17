"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { games } from "@/lib/games";
import {
  Search,
  Sparkles,
  Flame,
  Filter,
  X,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import DenomSelector from "./DenomSelector";
import TrustBar from "./TrustBar";

/** ---------------------------
 *  Type guards & safe getters
 *  --------------------------- */
type Game = (typeof games)[number];

function getAliasesSafe(g: Game): string[] {
  const anyG = g as any;
  if (Array.isArray(anyG.alias)) return anyG.alias as string[];
  if (Array.isArray(anyG.aliases)) return anyG.aliases as string[];
  return [];
}

function getUpdatedAtSafe(g: Game): number {
  const v = (g as any).updatedAt as number | string | undefined;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const ts = Date.parse(v);
    return Number.isNaN(ts) ? 0 : ts;
  }
  return 0;
}

function getTagsSafe(g: Game): string[] {
  const anyG = g as any;
  if (Array.isArray(anyG.tags)) return anyG.tags as string[];
  return [];
}

const TAGS_ALWAYS = ["populer", "resmi"];

export default function HomeClient() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<"popular" | "az" | "newest">("popular");
  const [selected, setSelected] = useState<Game | null>(null);
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(null);

  // kumpulkan tag
  const tags = useMemo(() => {
    const bag = new Set<string>(TAGS_ALWAYS);
    for (const g of games) getTagsSafe(g).forEach((t) => bag.add(t));
    return Array.from(bag).sort();
  }, []);

  // filter + sort
  const filtered = useMemo(() => {
    let rows = games.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((g) => {
        const inName = g.name.toLowerCase().includes(q);
        const inAlias = getAliasesSafe(g).some((a) => a.toLowerCase().includes(q));
        const inTags = getTagsSafe(g).some((t) => t.toLowerCase().includes(q));
        return inName || inAlias || inTags;
      });
    }

    if (tag) rows = rows.filter((g) => getTagsSafe(g).includes(tag));

    switch (sort) {
      case "az":
        rows.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        rows.sort((a, b) => getUpdatedAtSafe(b) - getUpdatedAtSafe(a));
        break;
      default:
        break; // popular = urutan default
    }
    return rows;
  }, [query, tag, sort]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border bg-white/60 p-8 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="relative z-10">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Aman • Cepat • Real-time
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Top Up Game{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Cepat, Aman,
            </span>{" "}
            dan <span className="text-sky-400">Terpercaya</span>
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">
            Pilih game, tentukan denom, bayar dengan QRIS/E-Wallet/VA. Garansi pesanan &
            pelacakan status otomatis.
          </p>

          {/* Pencarian + Sort */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[260px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari game: Mobile Legends, FF, Genshin…"
                className="w-full rounded-2xl border bg-white/70 py-2 pl-10 pr-4 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 dark:border-neutral-800 dark:bg-neutral-900/70"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="hidden text-sm text-neutral-500 sm:block">Urutkan</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="rounded-xl border bg-white/70 px-3 py-2 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 dark:border-neutral-800 dark:bg-neutral-900/70"
              >
                <option value="popular">Paling Populer</option>
                <option value="az">A → Z</option>
                <option value="newest">Update Terbaru</option>
              </select>
            </div>
          </div>

          {/* Tag Filter */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="inline-flex items-center gap-2 rounded-xl border bg-white/70 px-3 py-2 text-xs font-medium shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
              <Filter className="h-4 w-4" /> Filter
            </span>
            <button
              onClick={() => setTag(null)}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                tag === null
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border bg-white/70 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70"
              }`}
            >
              All
            </button>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-xl px-3 py-2 text-xs font-medium capitalize transition ${
                  tag === t
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border bg-white/70 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Glow dekoratif */}
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
      </section>

      {/* TRUST BAR — NON STICKY (tidak menghalangi klik) */}
      <div className="mt-6">
        <TrustBar sticky={false} />
      </div>

      {/* GRID GAME */}
      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {tag ? `Kategori: ${tag}` : "Semua Game"}
          </h2>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <div className="inline-flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" /> Garansi Pesanan
            </div>
            <div className="inline-flex items-center gap-1">
              <BadgeCheck className="h-4 w-4" /> Resmi
            </div>
            <div className="inline-flex items-center gap-1">
              <Flame className="h-4 w-4" /> {filtered.length} judul
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border p-10 text-center text-sm text-neutral-500 dark:border-neutral-800">
            Tidak ditemukan. Coba kata kunci lain.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelected(g)}
                className="group overflow-hidden rounded-2xl border bg-white/50 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/50"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={g.image}
                    alt={g.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-lg bg-black/55 px-2 py-1 text-[10px] font-medium text-white backdrop-blur group-hover:bg-black/60">
                    <Sparkles className="h-3 w-3" /> Resmi
                  </span>
                </div>
                <div className="p-3">
                  <div className="line-clamp-1 text-sm font-semibold">{g.name}</div>
                  <div className="mt-1 line-clamp-1 text-xs text-neutral-500">
                    Klik untuk pilih denom
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {getTagsSafe(g).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border px-2 py-0.5 text-[10px] capitalize text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* MODAL DENOM */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border bg-white p-4 shadow-2xl ring-1 ring-black/5 dark:border-neutral-800 dark:bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <DenomSelector
              gameId={selected.id}
              onClose={() => setSelected(null)}
              onToast={(t) => setToast(t)}
            />
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white shadow-lg">
            {toast.title}
          </div>
        </div>
      )}
    </>
  );
}
