"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { games } from "@/lib/games";
import { Search, Sparkles, Flame, Filter, X, ShieldCheck, BadgeCheck } from "lucide-react";
import DenomSelector from "./DenomSelector";
import TrustBar from "./TrustBar";

type Game = (typeof games)[number];

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}
function getAliasesSafe(g: Game): string[] {
  const anyG = g as unknown as { alias?: unknown; aliases?: unknown };
  if (isStringArray(anyG.alias)) return anyG.alias;
  if (isStringArray(anyG.aliases)) return anyG.aliases;
  return [];
}
function getUpdatedAtSafe(g: Game): number {
  const v = (g as unknown as { updatedAt?: unknown }).updatedAt;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const ts = Date.parse(v);
    return Number.isNaN(ts) ? 0 : ts;
  }
  return 0;
}
function getTagsSafe(g: Game): string[] {
  const v = (g as unknown as { tags?: unknown }).tags;
  if (isStringArray(v)) return v;
  return [];
}

type SortKey = "popular" | "az" | "newest";

export default function HomeClient() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("popular");
  const [selected, setSelected] = useState<Game | null>(null);

  const tags = useMemo(() => {
    const bag = new Set<string>();
    for (const g of games) getTagsSafe(g).forEach((t) => bag.add(t));
    return Array.from(bag).sort();
  }, []);

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
        break;
    }
    return rows;
  }, [query, tag, sort]);

  return (
    <>
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
            Pilih game, tentukan denom, bayar dengan QRIS/E-Wallet/VA. Garansi & pelacakan otomatis.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[260px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari game: mlbb, genshin, hsr..."
                className="w-full rounded-xl border bg-white/70 pl-9 pr-3 py-2 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 dark:border-neutral-800 dark:bg-neutral-900/70"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSort("popular")}
                className={`inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs shadow-sm transition ${
                  sort === "popular" ? "border-indigo-600 bg-indigo-600/10 text-indigo-700" : "hover:shadow dark:border-neutral-700"
                }`}
                aria-pressed={sort === "popular"}
              >
                <Flame size={14} /> Populer
              </button>
              <button
                onClick={() => setSort("az")}
                className={`inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs shadow-sm transition ${
                  sort === "az" ? "border-indigo-600 bg-indigo-600/10 text-indigo-700" : "hover:shadow dark:border-neutral-700"
                }`}
                aria-pressed={sort === "az"}
              >
                A–Z
              </button>
              <button
                onClick={() => setSort("newest")}
                className={`inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs shadow-sm transition ${
                  sort === "newest" ? "border-indigo-600 bg-indigo-600/10 text-indigo-700" : "hover:shadow dark:border-neutral-700"
                }`}
                aria-pressed={sort === "newest"}
              >
                <Sparkles size={14} /> Terbaru
              </button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Filter size={16} className="opacity-60" />
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTag(tag === t ? null : t)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      tag === t ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "hover:shadow dark:border-neutral-700"
                    }`}
                    aria-pressed={tag === t}
                  >
                    #{t}
                  </button>
                ))}
                {tag && (
                  <button
                    onClick={() => setTag(null)}
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition hover:shadow dark:border-neutral-700"
                    aria-label="Bersihkan filter"
                  >
                    <X size={12} /> Bersihkan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-400/40 via-sky-400/40 to-emerald-400/40 blur-3xl"
        />
      </section>

      <div className="mt-4">
        <TrustBar />
      </div>

      <section id="games" className="mt-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelected(g)}
              className="group overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              aria-label={`Pilih ${g.name}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={g.image}
                  alt={g.name}
                  fill
                  sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
                  className="object-cover transition group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-0 left-0 p-2 text-white opacity-0 transition group-hover:opacity-100">
                  <div className="flex items-center gap-1 text-[10px]">
                    <BadgeCheck size={12} /> Resmi
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <div className="line-clamp-1 text-sm font-semibold">{g.name}</div>
                <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] text-neutral-500 dark:border-neutral-700">
                  <ShieldCheck size={12} /> Aman
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 dark:bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <DenomSelector gameId={selected.id} onClose={() => setSelected(null)} />
          </div>
        </div>
      )}
    </>
  );
}
