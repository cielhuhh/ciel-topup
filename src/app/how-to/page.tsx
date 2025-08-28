export const metadata = {
  title: "Cara Beli • Ciel Top Up",
  description:
    "Panduan belanja di Ciel Top Up: pilih game & denom, masukkan ID, bayar via QRIS/E-Wallet/VA, item masuk otomatis < 1 menit.",
};

import { ShieldCheck, Clock, Zap, HelpCircle, HeadphonesIcon } from "lucide-react";

export default function CaraBeliPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-white/60 p-8 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Cara <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">Beli</span>
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">
            Ikuti langkah sederhana ini untuk menyelesaikan pesanan dengan aman dan cepat.
          </p>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 dark:border-neutral-700">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Garansi Pesanan
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 dark:border-neutral-700">
              <Zap className="h-4 w-4 text-indigo-500" /> Proses Otomatis
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 dark:border-neutral-700">
              <Clock className="h-4 w-4 text-amber-500" /> Support 24/7
            </span>
          </div>
        </div>

        {/* Gradient dekorasi */}
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
      </section>

      {/* Detail langkah */}
      <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            step: "1. Masukkan ID",
            sub: "ID/UID & Server",
            desc: "Buka game Anda lalu salin ID/UID dan (jika ada) pilih server yang benar.",
          },
          {
            step: "2. Pilih Denom",
            sub: "Diamond/Pass/Bundle",
            desc: "Pilih paket Diamonds, Weekly Pass, Blessing, atau bundle lain sesuai kebutuhan.",
          },
          {
            step: "3. Bayar",
            sub: "QRIS / E-Wallet / VA",
            desc: "Scan QRIS atau bayar via E-Wallet/VA. Pesanan diproses otomatis setelah sukses.",
          },
          {
            step: "4. Selesai",
            sub: "Otomatis < 1 menit*",
            desc: "Item langsung masuk ke akun Anda secara real-time.",
          },
        ].map((c) => (
          <article
            key={c.step}
            className="rounded-2xl border bg-white/50 p-4 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <h3 className="text-sm font-semibold">{c.step}</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{c.sub}</p>
            <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">{c.desc}</p>
          </article>
        ))}
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <HelpCircle className="h-5 w-5" /> Pertanyaan Umum
        </h2>
        <div className="divide-y rounded-2xl border bg-white/50 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/50">
          {[
            {
              q: "Bagaimana cara cek ID/UID akun?",
              a: "Buka profil di dalam game lalu salin ID/UID yang tertera. Beberapa game juga menampilkan Server/Zone—pastikan pilih yang benar.",
            },
            {
              q: "Pesanan belum masuk?",
              a: "Kebanyakan pesanan masuk < 1 menit. Jika lebih lama, cek status pembayaran & koneksi. Masih terkendala? Hubungi Bantuan.",
            },
            {
              q: "Apakah aman?",
              a: "Ya. Pembayaran diproses melalui mitra resmi (QRIS/E-Wallet/VA) dan sistem otomatis yang terverifikasi.",
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

      {/* CTA Bantuan */}
      <section className="mt-12 rounded-2xl border bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-emerald-500/10 p-6 dark:border-neutral-800">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 shadow-sm ring-1 ring-black/5 dark:bg-neutral-900/70">
              <HeadphonesIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold">Butuh bantuan langsung?</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Tim kami siap membantu 24/7.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href="/bantuan"
              className="rounded-xl border px-3 py-2 text-sm shadow-sm transition hover:shadow dark:border-neutral-700"
            >
              Lihat Bantuan
            </a>
            <a
              href="https://wa.me/6285854080571"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
