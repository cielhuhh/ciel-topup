"use client";

import { useState } from "react";

type TicketPayload = {
  name: string;
  contact: string;
  orderId?: string;
  desc: string;
};

export default function SupportTicketForm() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const data: TicketPayload = {
      name: String(raw.name || ""),
      contact: String(raw.contact || ""),
      orderId: raw.orderId ? String(raw.orderId) : undefined,
      desc: String(raw.desc || ""),
    };

    // Pakai data agar tidak "unused" dan tetap berguna:
    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => { /* ignore error on demo */ });

    setSubmitting(false);
    form.reset();
    alert("Tiket terkirim! Tim kami akan menghubungi Anda segera.");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border bg-white/60 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Nama</label>
          <input
            name="name"
            className="w-full rounded-xl border bg-white/70 px-3 py-2 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 dark:border-neutral-800 dark:bg-neutral-900/70"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email / WhatsApp</label>
          <input
            name="contact"
            className="w-full rounded-xl border bg-white/70 px-3 py-2 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 dark:border-neutral-800 dark:bg-neutral-900/70"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Nomor Pesanan (opsional)</label>
          <input
            name="orderId"
            placeholder="CTU-2025-XXXX"
            className="w-full rounded-xl border bg-white/70 px-3 py-2 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 dark:border-neutral-800 dark:bg-neutral-900/70"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Deskripsi Kendala</label>
          <textarea
            name="desc"
            rows={4}
            className="w-full rounded-xl border bg-white/70 px-3 py-2 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-indigo-500 dark:border-neutral-800 dark:bg-neutral-900/70"
            required
          />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {submitting ? "Mengirim..." : "Kirim Tiket"}
        </button>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border px-4 py-2 text-sm shadow-sm transition hover:shadow dark:border-neutral-700"
        >
          Chat WhatsApp
        </a>
      </div>
    </form>
  );
}
