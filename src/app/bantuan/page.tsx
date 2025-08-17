export const metadata = {
  title: "Bantuan • Ciel Top Up",
  description:
    "Pusat bantuan Ciel Top Up: panduan, troubleshooting, kontak support, dan form tiket.",
};

import {
  HeadphonesIcon,
  MessageSquare,
  Mail,
  Bug,
  Timer,
  Search,
} from "lucide-react";
import SupportTicketForm from "@/components/SupportTicketForm";

export default function BantuanPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-white/60 p-8 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pusat{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Bantuan
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">
            Kami siap membantu 24/7. Cari solusi cepat atau hubungi tim support.
          </p>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl"
        />
      </section>

      {/* Quick helps */}
      <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: Search,
            title: "Cek Status Pesanan",
            desc: "Lihat status pembayaran & progres pengisian secara real-time.",
            href: "/checkout",
            cta: "Buka Pelacak",
          },
          {
            icon: Timer,
            title: "Pesanan Lama Masuk?",
            desc: "Tunggu hingga 30 menit (kondisi ramai/maintenance). Jika lewat, ajukan tiket.",
            href: "#ticket",
            cta: "Buat Tiket",
          },
          {
            icon: Bug,
            title: "Laporan Kendala",
            desc: "Laporkan bug atau error pada halaman, proses, maupun pembayaran.",
            href: "#ticket",
            cta: "Laporkan",
          },
        ].map((c, i) => (
          <article
            key={i}
            className="flex flex-col justify-between rounded-2xl border bg-white/50 p-5 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <div>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 shadow-sm ring-1 ring-black/5 dark:bg-neutral-900/70">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {c.desc}
              </p>
            </div>
            <a
              href={c.href}
              className="mt-4 inline-flex w-max items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm transition hover:shadow dark:border-neutral-700"
            >
              {c.cta} →
            </a>
          </article>
        ))}
      </section>

      {/* Kontak langsung */}
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Kontak Support</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: HeadphonesIcon,
              label: "WhatsApp",
              href: "https://wa.me/6281234567890",
              hint: "Fast response 24/7",
            },
            {
              icon: MessageSquare,
              label: "Telegram",
              href: "https://t.me/your_support",
              hint: "DM admin",
            },
            {
              icon: Mail,
              label: "Email",
              href: "mailto:support@cieltopup.id",
              hint: "Balasan &lt; 1×24 jam",
            },
          ].map((k, i) => (
            <a
              key={i}
              href={k.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border bg-white/50 p-4 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 shadow-sm ring-1 ring-black/5 dark:bg-neutral-900/70">
                <k.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold">{k.label}</div>
                <div
                  className="text-xs text-neutral-500 dark:text-neutral-400"
                  dangerouslySetInnerHTML={{ __html: k.hint }}
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form tiket (Client Component) */}
      <section id="ticket" className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Buat Tiket Bantuan</h2>
        <SupportTicketForm />
      </section>
    </main>
  );
}
