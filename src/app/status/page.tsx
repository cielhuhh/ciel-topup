export const metadata = {
  title: "Status Sistem — Ciel Top Up",
  description: "Pantau ketersediaan API & gateway pembayaran secara real-time.",
};

type Service = {
  name: string;
  desc: string;
  status: "operational" | "degraded" | "outage" | "maintenance";
  uptime: string;
};

const SERVICES: Service[] = [
  { name: "Gateway Pembayaran", desc: "QRIS / E-Wallet / VA", status: "operational", uptime: "99.98%" },
  { name: "Webhook Idempoten", desc: "Konsistensi & retry logic", status: "operational", uptime: "100%" },
  { name: "API Publisher A", desc: "Delivery MLBB/FF", status: "degraded", uptime: "99.2%" },
  { name: "API Publisher B", desc: "Genshin/HSR", status: "operational", uptime: "99.95%" },
];

function Pill({ s }: { s: Service["status"] }) {
  const map = {
    operational: { label: "Operational", bg: "bg-green-500/15", dot: "bg-green-500" },
    degraded: { label: "Degraded", bg: "bg-yellow-500/15", dot: "bg-yellow-400" },
    outage: { label: "Outage", bg: "bg-red-500/15", dot: "bg-red-500" },
    maintenance: { label: "Maintenance", bg: "bg-blue-500/15", dot: "bg-blue-500" },
  } as const;
  const m = map[s];
  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold ${m.bg}`}>
      <span className={`h-2 w-2 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

export default function StatusPage() {
  return (
    <main className="container-px py-10 space-y-8">
      <header className="card bg-hero border-none text-white p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Status Sistem</h1>
        <p className="mt-2 text-white/90">Pembaruan otomatis setiap beberapa menit.</p>
      </header>

      <section className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.name} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
              <Pill s={s.status} />
            </div>
            <div className="mt-4 text-sm">
              Uptime 30 hari: <span className="font-semibold">{s.uptime}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="card p-6 sm:p-8">
        <h3 className="text-lg font-semibold">Catatan Peristiwa Terakhir</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li>• 12:10 — API Publisher A mengalami peningkatan latensi (monitoring).</li>
          <li>• 08:02 — Perbaikan minor di modul pembayaran VA (selesai).</li>
          <li>• Kemarin — Tidak ada insiden yang dilaporkan.</li>
        </ul>
      </section>
    </main>
  );
}
