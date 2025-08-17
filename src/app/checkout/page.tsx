// src/app/checkout/page.tsx
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
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
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
        const arr: CartItem[] = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length) setItem(arr[arr.length - 1]);
      }
    } catch {}
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
      if (!res.ok) throw new Error((await res.text()) || "Gagal membuat pesanan");
      const data = await res.json();

      try {
        localStorage.setItem("cart", JSON.stringify([]));
        window.dispatchEvent(new StorageEvent("storage", { key: "cart" }));
      } catch {}

      setStatus("success");
      if (data?.payment_url) window.location.href = data.payment_url;
      else router.push(`/checkout?success=1&order=${encodeURIComponent(data?.id ?? "")}`);
    } catch (e: any) {
      setStatus("error");
      setError(e?.message ?? "Terjadi kesalahan");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      {/* Ganti stepper: judul sederhana */}
      <header className="mb-6">
        <h1 className="text-lg font-semibold">Checkout</h1>
        <p className="text-sm text-white/60">Isi data akun, pilih metode bayar, lalu selesaikan pembayaran.</p>
      </header>

      <div className="grid gap-5 md:grid-cols-[2fr,1fr]">
        {/* Kiri */}
        <div className="space-y-5">
          <Section title="Detail Pesanan">
            {item ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm text-white/60">Game</div>
                  <div className="font-medium">{item.gameName}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60">Paket</div>
                  <div className="font-medium">{item.denomLabel}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/60">Harga</div>
                  <div className="font-semibold">{currency(item.price)}</div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-white/60">Keranjang kosong. Kembali ke beranda untuk memilih paket.</div>
            )}
          </Section>

          <Section title="Data Akun">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Player ID"
                placeholder="contoh: 123456789(1234)"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
              />
              <Field
                label="Server/Region (opsional)"
                placeholder="contoh: Asia / 2150"
                value={server}
                onChange={(e) => setServer(e.target.value)}
              />
              <Field
                label="Kontak (opsional)"
                placeholder="Email / WhatsApp untuk bukti bayar"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="sm:col-span-2"
              />
            </div>
          </Section>

          <Section title="Metode Pembayaran">
            <div className="grid gap-3 sm:grid-cols-3">
              <MethodCard
                active={payment === "qris"}
                icon={QrCode}
                title="QRIS"
                desc="Scan semua e-wallet/bank"
                onClick={() => setPayment("qris")}
              />
              <MethodCard
                active={payment === "ewallet"}
                icon={Wallet2}
                title="E-Wallet"
                desc="OVO / Dana / GoPay / ShopeePay"
                onClick={() => setPayment("ewallet")}
              />
              <MethodCard
                active={payment === "va"}
                icon={CreditCard}
                title="Virtual Account"
                desc="BCA / BNI / Mandiri / dll"
                onClick={() => setPayment("va")}
              />
            </div>
          </Section>

          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck className="h-4 w-4" />
              Pembayaran aman. Otomatis & bisa refund jika gagal.
            </div>
            <button
              onClick={submit}
              disabled={status === "loading" || !item}
              className={clsx(
                "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
                "bg-indigo-600 text-white shadow transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              )}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Bayar Sekarang
                </>
              )}
            </button>
          </div>
        </div>

        {/* Kanan */}
        <aside className="space-y-5">
          <Section title="Ringkasan Pembayaran">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Harga</span>
                <span>{item ? currency(item.price) : "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Biaya {payment.toUpperCase()}</span>
                <span>{item ? currency(fee) : "-"}</span>
              </div>
              <div className="my-2 border-t border-white/10" />
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span>{item ? currency(total) : "-"}</span>
              </div>
            </div>
          </Section>

          <Section title="Tips">
            <ul className="list-disc space-y-2 pl-4 text-xs text-white/60">
              <li>Pastikan **Player ID** & **Server** benar sebelum bayar.</li>
              <li>Proses biasanya <strong>&lt; 1 menit</strong> setelah pembayaran.</li>
              <li>Simpan bukti bayar. Kendala? buka menu <strong>Bantuan</strong>.</li>
            </ul>
          </Section>
        </aside>
      </div>
    </div>
  );
}
