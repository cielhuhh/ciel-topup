export const metadata = {
  title: "Garansi • Ciel Top Up",
  description:
    "Kebijakan garansi pesanan Ciel Top Up. Pesanan aman, otomatis, dan didukung refund jika gagal.",
};

import {
  ShieldCheck,
  TimerReset,
  Receipt,
  ShieldAlert,
  ClipboardCheck,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

export default function GaransiPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-white/60 p-8 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Kebijakan <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Garansi</span>
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">
            Belanja tenang. Semua pesanan kami lindungi dengan sistem verifikasi &
            garansi kegagalan.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 dark:border-neutral-700">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Verifikasi otomatis
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 dark:border-neutral-700">
              <TimerReset className="h-4 w-4 text-amber-500" />
              SLA cepat
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 dark:border-neutral-700">
              <Receipt className="h-4 w-4 text-indigo-500" />
              Bukti transaksi jelas
            </span>
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
      </section>

      {/* Ringkasan poin garansi */}
      <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: ShieldAlert,
            title: "Pesanan gagal = Refund",
            desc: "Jika saldo/diamonds tidak masuk setelah pembayaran sukses & melewati SLA, pesanan akan kami refund penuh.",
          },
          {
            icon: ClipboardCheck,
            title: "Validasi ID otomatis",
            desc: "Sistem memvalidasi ID/UID & server untuk meminimalkan kesalahan pengisian.",
          },
          {
            icon: RefreshCw,
            title: "Re-proses otomatis",
            desc: "Jika provider delay, sistem akan mencoba proses ulang sebelum dinyatakan gagal.",
          },
        ].map((c, i) => (
          <article
            key={i}
            className="rounded-2xl border bg-white/50 p-5 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 shadow-sm ring-1 ring-black/5 dark:bg-neutral-900/70">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{c.desc}</p>
          </article>
        ))}
      </section>

      {/* Ketentuan */}
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Ketentuan Garansi</h2>
        <div className="rounded-2xl border bg-white/50 p-5 dark:border-neutral-800 dark:bg-neutral-900/50">
          <ol className="list-decimal space-y-3 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
            <li>Pembayaran harus berstatus <strong>berhasil</strong> dan terverifikasi.</li>
            <li>
              SLA normal &lt; 1 menit. Pada kondisi ramai/maintenance provider, SLA dapat
              memanjang hingga 30 menit.
            </li>
            <li>
              Jika melebihi SLA dan item tidak masuk, ajukan <strong>klaim garansi</strong> dengan
              bukti pembayaran & nomor pesanan.
            </li>
            <li>
              Kesalahan input ID/UID/Server tidak ditanggung. Pastikan data benar sebelum
              membayar.
            </li>
            <li>Refund diproses ke metode pembayaran semula sesuai kebijakan mitra.</li>
          </ol>
        </div>
      </section>

      {/* FAQ ringkas */}
      <section className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <HelpCircle className="h-5 w-5" /> FAQ Garansi
        </h2>
        <div className="divide-y rounded-2xl border bg-white/50 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/50">
          {[
            {
              q: "Kapan saya bisa klaim garansi?",
              a: "Jika status bayar sukses namun item belum masuk setelah melewati SLA. Siapkan nomor pesanan dan bukti bayar.",
            },
            {
              q: "Berapa lama refund?",
              a: "Umumnya instan — maksimal mengikuti kebijakan mitra pembayaran (E-Wallet/VA/Bank).",
            },
            {
              q: "Saya salah input ID/Server, bisa refund?",
              a: "Maaf tidak bisa. Namun jika item belum diproses, kontak tim kami secepatnya agar bisa dicek.",
            },
          ].map((f, i) => (
            <details key={i} className="group px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                <span>{f.q}</span>
                <span className="ml-auto transition group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA klaim */}
      <section className="mt-12 rounded-2xl border bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 p-6 dark:border-neutral-800">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h3 className="text-base font-semibold">Butuh klaim garansi?</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Siapkan nomor pesanan & bukti pembayaran, lalu hubungi kami.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/bantuan"
              className="rounded-xl border px-3 py-2 text-sm shadow-sm transition hover:shadow dark:border-neutral-700"
            >
              Pusat Bantuan
            </a>
            <a
              href="https://wa.me/6285854080571"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-500"
            >
              Ajukan via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
