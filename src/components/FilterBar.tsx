"use client";

type Props = {
  q: string;
  setQ: (v: string) => void;
  tag: string | null;
  setTag: (v: string | null) => void;
  sort: "popular" | "name";
  setSort: (v: "popular" | "name") => void;
  tags: string[];
};

export default function FilterBar({ q, setQ, tag, setTag, sort, setSort, tags }: Props) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari game…"
        className="w-full max-w-sm rounded-xl border bg-white/70 px-3 py-2 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 dark:border-neutral-800 dark:bg-neutral-900/70"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSort("popular")}
          className={`rounded-xl border px-3 py-1.5 text-xs shadow-sm transition ${
            sort === "popular" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "hover:shadow dark:border-neutral-700"
          }`}
        >
          Populer
        </button>
        <button
          onClick={() => setSort("name")}
          className={`rounded-xl border px-3 py-1.5 text-xs shadow-sm transition ${
            sort === "name" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "hover:shadow dark:border-neutral-700"
          }`}
        >
          A–Z
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(tag === t ? null : t)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              tag === t ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "hover:shadow dark:border-neutral-700"
            }`}
          >
            #{t}
          </button>
        ))}
      </div>
    </div>
  );
}
