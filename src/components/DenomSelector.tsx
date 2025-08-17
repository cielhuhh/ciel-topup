"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { games } from "@/lib/games";
import { Check, Loader2, Wallet } from "lucide-react";

type Props = { gameId: string; onClose: () => void };

type OrderResponse = {
  orderId: string;
  status: "PENDING_PAYMENT" | "PAID" | "FAILED";
};

type PaymentResponse = {
  paymentUrl: string;
  method: string;
};

export default function DenomSelector({ gameId, onClose }: Props) {
  const game = useMemo(() => games.find((g) => g.id === gameId), [gameId]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!game) onClose();
  }, [game, onClose]);

  const handleCheckout = useCallback(async () => {
    if (!game || !selected) return;
    setLoading(true);
    try {
      const resOrder = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: game.id, denomCode: selected, playerId: "PLAYER_ID" }),
      });
      const orderJson: OrderResponse = await resOrder.json();

      const resPay = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderJson.orderId }),
      });
      const payJson: PaymentResponse = await resPay.json();

      window.location.href = payJson.paymentUrl;
    } catch {
      alert("Terjadi kesalahan. Coba lagi ya.");
    } finally {
      setLoading(false);
    }
  }, [game, selected]);

  if (!game) return null;

  return (
    <div>
      <div className="mb-3 text-sm font-semibold">{game.name}</div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {game.denoms.map((d) => {
          const active = selected === d.code;
          return (
            <button
              key={d.code}
              onClick={() => setSelected(d.code)}
              className={`rounded-xl border p-3 text-left transition ${
                active ? "border-indigo-600 bg-indigo-50 shadow-sm" : "hover:shadow dark:border-neutral-700"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-medium opacity-70">{d.label}</div>
                  <div className="text-sm font-semibold">Rp {d.price.toLocaleString("id-ID")}</div>
                </div>
                {active ? <Check className="text-indigo-600" size={18} /> : null}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-xl border px-4 py-2 text-sm shadow-sm transition hover:shadow dark:border-neutral-700"
        >
          Batal
        </button>
        <button
          onClick={handleCheckout}
          disabled={!selected || loading}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Wallet size={16} />} Lanjut Bayar
        </button>
      </div>
    </div>
  );
}
