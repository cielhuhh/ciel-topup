"use client";

export default function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-neutral-900">
      <div className="relative aspect-[4/3] w-full bg-neutral-200 dark:bg-neutral-800" />
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-3 w-10 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}
