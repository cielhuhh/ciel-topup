"use client";
import { Check, User2, CreditCard, ReceiptText } from "lucide-react";
import clsx from "clsx";

type Props = {
  /** Tampilkan versi ringkas (lebih kecil & satu baris) */
  compact?: boolean;
  className?: string;
};

export default function CheckoutStepper({ compact = false, className }: Props) {
  const steps = [
    { icon: User2, title: "Masukkan ID", desc: "ID/UID & Server" },
    { icon: CreditCard, title: "Pilih Denom", desc: "Diamond/Pass/Bundle" },
    { icon: ReceiptText, title: "Bayar", desc: "QRIS / E-Wallet / VA" },
    { icon: Check, title: "Selesai", desc: "Otomatis < 1 menit*" },
  ];

  return (
    <div
      className={clsx(
        "w-full rounded-2xl border bg-white/60 p-4 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60",
        className
      )}
    >
      <ol
        className={clsx(
          "grid gap-3 md:gap-4",
          compact ? "grid-cols-2 md:grid-cols-4 items-center" : "grid-cols-1 md:grid-cols-4"
        )}
      >
        {steps.map((s, i) => (
          <li
            key={s.title}
            className={clsx(
              "flex items-start gap-3 rounded-xl border p-3 dark:border-neutral-800",
              compact ? "md:flex-row" : "md:flex-col"
            )}
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600/10 text-indigo-600">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">{i + 1}. {s.title}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">{s.desc}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
