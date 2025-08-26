"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { games } from "@/lib/games";
import { Search, Sparkles, Flame, Filter, X, ShieldCheck, BadgeCheck } from "lucide-react";
import DenomSelector from "./DenomSelector";
import TrustBar from "./TrustBar";

type Game = (typeof games)[number];
type SortKey = "popular" | "az" | "newest";

/* Safe getters */
function getAliasesSafe(g: Game): string[] {
  const alias = (g as unknown as { alias?: unknown }).alias;
  const aliases = (g as unknown as { aliases?: unknown }).aliases;
  const source = Array.isArray(alias) ? alias : Array.isArray(aliases) ? aliases : [];
  return (source as unknown[]).filter((x): x is string => typeof x === "string");
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
  const t = (g as unknown as { tags?: unknown }).tags;
  if (Array.isArray(t)) return (t as unknown[]).filter((x): x is string => typeof x === "string");
  return [];
}

const TAGS_ALWAYS = ["populer", "resmi"];

export default function HomeClient() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("popular");
  const [selected, setSelected] = useState<Game | null>(null);
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(null);

  const tags = useMemo(() => {
    const bag = new Set<string>(TAGS_ALWAYS);
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
        break; // "popular" pakai urutan default
    }
    return rows;
  }, [query, tag, sort]);

  return (
    <div className="space-y-6">
      {/* Search + Filter */}
      <section className="rounded-2xl border bg-card/80 p-4 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-xl border bg-background/60 px-3 py-2 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-indigo-500">
            <Search className="h-4 w-4 opacity-60" />
            <input
              placeholder="Cari game / tag (mis. mlbb, genshin, resmi)"
              className="w-full bg-transparent text-sm outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden text-xs opacity-70 sm:inline-flex">
              <Flame className="mr-1 h-4 w-4" /> Urut:
            </div>
            <select
              className="rounded-lg border bg-background/60 px-3 py-2 text-sm ring-1 ring-black/5"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="popular">Terpopuler</option>
              <option value="az">A → Z</option>
              <option value="newest">Terbaru</option>
            </select>
            <div className="hidden items-center gap-1 rounded-lg border bg-background/60 px-3 py-2 text-xs ring-1 ring-black/5 sm:flex">
              <Filter className="h-4 w-4" />
              Filter:
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => {
                const active = t === tag;
                return (
                  <button
                    key={t}
                    onClick={() => setTag(active ? null : t)}
                    className={`rounded-lg px-2.5 py-1 text-xs transition ${
                      active
                        ? "bg-indigo-600 text-white shadow ring-1 ring-indigo-400"
                        : "border bg-background/60 ring-1 ring-black/5 hover:bg-foreground/5"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
              {tag && (
                <button
                  className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs ring-1 ring-black/5 hover:bg-foreground/5"
                  onClick={() => setTag(null)}
                  aria-label="Hapus filter"
                >
                  <X className="h-3.5 w-3.5" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust row */}
      <TrustBar />

      {/* Grid games */}
      <section>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border bg-card/60 p-6 text-sm opacity-70">
            Tidak ada game yang cocok dengan pencarian.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelected(g)}
                className="group overflow-hidden rounded-2xl border bg-card text-left transition hover:-translate-y-0.5 hover:shadow"
              >
                <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    alt={g.name}
                    src={g.image}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-lg bg-black/55 px-2 py-1 text-[10px] font-medium text-white backdrop-blur group-hover:bg-black/60">
                    <Sparkles className="h-3 w-3" /> Resmi
                  </span>
                </div>
                <div className="p-3">
                  <div className="line-clamp-1 text-sm font-semibold">{g.name}</div>
                  <div className="mt-1 line-clamp-1 text-xs text-neutral-500">Klik untuk pilih denom</div>
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

      {/* Modal Denom */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border bg-card p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-emerald-500" />
                <div className="text-sm font-medium">{selected.name}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-foreground/5"
              >
                Tutup
              </button>
            </div>
            <DenomSelector
              gameId={selected.id}
              onClose={() => setSelected(null)}
              onToast={(t) => setToast({ title: t.title, message: t.desc })}
            />
          </div>
        </div>
      )}

      {/* Toast simple */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-xl border bg-card px-4 py-2 text-sm shadow">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <div>
            <div className="font-medium">{toast.title}</div>
            {toast.message ? <div className="text-xs opacity-70">{toast.message}</div> : null}
          </div>
          <button className="ml-3 text-xs opacity-70 hover:opacity-100" onClick={() => setToast(null)}>
            Tutup
          </button>
        </div>
      )}
    </div>
  );
}
