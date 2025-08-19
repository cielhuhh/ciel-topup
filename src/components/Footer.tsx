// src/components/Footer.tsx
import Link from "next/link";
import { Mail, Phone, MessageCircle, ExternalLink, Github } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Beranda" },
  { href: "/cara-beli", label: "Cara Beli" },
  { href: "/garansi", label: "Garansi" },
  { href: "/bantuan", label: "Bantuan" },
  { href: "/checkout", label: "Checkout" },
];

const legalLinks = [
  { href: "/kebijakan-privasi", label: "Kebijakan Privasi" },
  { href: "/syarat-ketentuan", label: "Syarat & Ketentuan" },
];

const payments = ["QRIS", "Dana", "OVO", "GoPay", "ShopeePay", "BCA VA", "BNI VA", "BRI VA"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="pt-12">
      <div className="grid gap-10 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-500/30">
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 12h4m-2-2v4M15.5 11.5h.01M18 13h.01" />
                <path d="M5 7h14a3 3 0 0 1 3 3v1.5a4.5 4.5 0 0 1-8.37 2.23L12 12l-1.63 1.73A4.5 4.5 0 0 1 2 11.5V10a3 3 0 0 1 3-3Z" />
              </svg>
            </span>
            <h3 className="text-lg font-semibold">Ciel Top Up</h3>
          </div>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
            Top up MLBB, Free Fire, Genshin, HSR, Honor of Kings, dan puluhan game lain. Bayar via QRIS, E-Wallet, atau Virtual Account. Proses cepat, aman, dan otomatis.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {payments.map((p) => (
              <span key={p} className="rounded-md border border-white/10 bg-neutral-900/40 px-2.5 py-1 text-xs text-foreground/80 ring-1 ring-black/5">
                {p}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link
              href="https://github.com/cielhuhh"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-neutral-900/40 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-neutral-900/60"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-2">
          <div>
            <h4 className="text-sm font-medium tracking-wide">Tautan</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground transition hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium tracking-wide">Bantuan</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground transition hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/status" className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-foreground">
                  Status Sistem <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 border-t border-white/5 pt-6 lg:col-span-2">
            <h4 className="text-sm font-medium tracking-wide">Kontak</h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Link
                href="mailto:hello@ciel.topup"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-neutral-900/40 px-3 py-2 text-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-neutral-900/60"
              >
                <Mail className="h-4 w-4" /> hello@ciel.topup
              </Link>
              <Link
                href="https://wa.me/6285854080571"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-neutral-900/40 px-3 py-2 text-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-neutral-900/60"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </Link>
              <Link
                href="tel:+6285854080571"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-neutral-900/40 px-3 py-2 text-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-neutral-900/60"
              >
                <Phone className="h-4 w-4" /> +6285854080571
              </Link>
            </div>

            <form action="/api/subscribe" method="POST" className="mt-6 flex w-full max-w-lg items-center gap-2">
              <input
                type="email"
                name="email"
                placeholder="Masukkan email untuk promo & update"
                required
                className="flex-1 rounded-lg border border-white/10 bg-neutral-900/40 px-3 py-2 text-sm outline-none ring-1 ring-black/5 placeholder:text-muted-foreground/70"
              />
              <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 active:translate-y-px">
                Langganan
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/5 pt-6 text-xs text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p>© {year} Ciel Top Up. Semua hak dilindungi.</p>
          <p className="text-[11px]">*Estimasi proses dapat berbeda tiap game & metode bayar.</p>
        </div>
      </div>
    </div>
  );
}
