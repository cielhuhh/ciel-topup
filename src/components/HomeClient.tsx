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
  const source = Array.isArray(alias)
    ? alias
    : Array.isArray(aliases)
    ? aliases
    : [];
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
  if (Array.isArray(t)) {
    return (t as unknown[]).filter((x): x is string => typeof x === "string");
  }
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
        break;
    }
    return rows;
  }, [query, tag, sort]);

  return (
    <div className="space-y-6">
      {/* Search + Filter */}
      {/* ... sisanya sama persis seperti kode kamu */}
    </div>
  );
}
