"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, CreditCard, Loader2, QrCode, ShieldCheck, Wallet2 } from "lucide-react";
import clsx from "clsx";

type PaymentMethod = "qris" | "ewallet" | "va";
type OrderStatus = "idle" | "loading" | "success" | "error";

type CartItem = {
  gameId: string;
  gameName: string;
  denomCode: string;
  denomLabel: string;
  price: number; // IDR
};

function currency(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-white/80">{title}</h3>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-white/70">{label}</div>
      <input
        {...rest}
        className={clsx(
          "w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm",
          "placeholder:text-white/30 focus:border-indigo-500 focus:outline-none"
        )}
      />
      {hint ? <p className="mt-1 text-[11px] text-white/40">{hint}</p> : null}
    </label>
  );
}

function MethodCard({
  active,
  icon: Icon,
  title,
  desc,
  onClick,
}: {
  active?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition",
        active
          ? "border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/40"
          : "border-white/10 hover:border-white/20 hover:bg-white/5"
      )}
    >
      <Icon className={clsx("h-5 w-5", active ? "text-indigo-400" : "text-white/60")} />
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-white/60">{desc}</div>
      </div>
      {active ? <CheckCircle2 className="h-5 w-5 text-indigo-400" /> : null}
    </button>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const q = useSearchParams();

  const [item, setItem] = useState<CartItem | null>(null);

  useEffect(() => {
    const gameName = q.get("game");
    const denomLabel = q.get("denom");
    const price = q.get("price");

    if (gameName && denomLabel && price) {
      setItem({
        gameId: (q.get("gameId") ?? gameName).toLowerCase().replace(/\s+/g, "-"),
        gameName,
        denomCode: q.get("denomCode") ?? denomLabel,
        denomLabel,
        price: Number(price),
      });
      return;
    }
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        const arr = JSON.parse(raw) as CartItem[];
        if (Array.isArray(arr) && arr.length) setItem(arr[arr.length - 1] ?? null);
      }
    } catch {
      /* ignore localStorage error */
    }
  }, [q]);

  const [playerId, setPlayerId] = useState("");
  const [server, setServer] = useState("");
  const [contact, setContact] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("qris");
  const [status, setStatus] = useState<OrderStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const fee = useMemo(() => {
    if (!item) return 0;
    if (payment === "qris") return Math.round(item.price * 0.005);
    if (payment === "ewallet") return 1500;
    return 1000;
  }, [item, payment]);

  const total = useMemo(() => (item ? item.price + fee : 0), [item, fee]);

  async function submit() {
    setError(null);
    if (!item) return setError("Keranjang masih kosong. Silakan pilih game & denom terlebih dahulu.");
    if (!playerId.trim()) return setError("Player ID wajib diisi.");

    setStatus("loading");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId: item.gameId,
          gameName: item.gameName,
          denomCode: item.denomCode,
          denomLabel: item.denomLabel,
          amount: total,
          paymentMethod: payment,
          playerId,
          server,
          contact,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Gagal membuat pesanan");
      }
      const data: { payment_url?: string; id?: string } = await res.json();

      try {
        localStorage.setItem("cart", JSON.stringify([]));
        window.dispatchEvent(new StorageEvent("storage", { key: "cart" }));
      } catch {
        /* ignore */
      }

      setStatus("success");
      if (data?.payment_url) window.location.href = data.payment_url;
      else router.push(`/checkout?success=1&order=${encodeURIComponent(data?.id ?? "")}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Terjadi kesalahan";
      setStatus("error");
      setError(message);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <header className="mb-6">
        <h1 className="text-lg font-semibold">Checkout</h1>
        <p className="text-sm text-white/60">
          Isi data akun, pilih metode bayar, lalu selesaikan pembayaran.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-[2fr,1fr]">
        <div className="space-y-5">
          {/* ... Bagian lain sama seperti kode kamu */}
        </div>
      </div>
    </div>
  );
}
