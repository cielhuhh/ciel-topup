"use client";
import { useEffect } from "react";

export default function Toast({
  open,
  onOpenChange,
  title,
  description,
}: {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  description?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onOpenChange, 2500);
    return () => clearTimeout(t);
  }, [open, onOpenChange]);

  if (!open) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 rounded-2xl border bg-white px-4 py-3 text-sm shadow-lg dark:bg-neutral-900">
      <div className="font-medium">{title}</div>
      {description && (
        <div className="mt-0.5 text-neutral-500">{description}</div>
      )}
    </div>
  );
}
