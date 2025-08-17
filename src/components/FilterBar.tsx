"use client";
import { useMemo } from "react";

export type Filter = {
  q: string;
  setQ: (v: string) => void;
  tag: string | null;
  setTag: (v: string | null) => void;
  sort: "popular" | "name";
  setSort: (v: "popular" | "name") => void;
  tags: string[];
};

export default function FilterBar({ q, setQ, tag, setTag, sort, setSort, tags }: Filter) {
  const allTags = useMemo(() => ["All", ...tags], [tags]);
  return (
    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
      <div className="flex-1">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari game: MLBB, FF, Genshin..."
          className="w-full rounded-xl border bg-white/70 px-4 py-3 text-sm outline-none shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 dark:bg-neutral-900/70"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {allTags.map((t) => {
          const val = t === "All" ? null : t;
          const active = (val ?? null) === tag;
          return (
            <button
              key={t}
              onClick={() => setTag(val)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                active ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" : "hover:bg-neutral-50 dark:hover:bg-neutral-800"
              }`}
            >
              {t}
            </button>
          );
        })}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="rounded-xl border bg-white/70 px-3 py-2 text-xs shadow-sm outline-none dark:bg-neutral-900/70"
        >
          <option value="popular">Paling Populer</option>
          <option value="name">Abjad A–Z</option>
        </select>
      </div>
    </div>
  );
}
