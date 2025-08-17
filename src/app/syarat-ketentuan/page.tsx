export const metadata = {
  title: "Syarat & Ketentuan — Ciel Top Up",
  description:
    "Aturan penggunaan layanan, kebijakan pembayaran, pengembalian, dan batasan tanggung jawab.",
};

export default function TermsPage() {
  const Section = ({ title, children }: any) => (
    <section className="card p-6 sm:p-8">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 prose prose-invert prose-sm sm:prose-base max-w-none">
        {children}
      </div>
    </section>
  );

  return (
    <main className="container-px py-10 space-y-6">
      <header className="card bg-hero border-none text-white p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Syarat &amp; Ketentuan</h1>
        <p className="mt-2 text-white/90">Berlaku efektif: 01 Januari 2025</p>
      </header>

      <Section title="Penggunaan Layanan">
        <ul>
          <li>Pengguna wajib memasukkan UID/Server yang benar.</li>
          <li>Pesanan diproses otomatis setelah pembayaran terkonfirmasi.</li>
          <li>Penyalahgunaan/penipuan akan diblokir permanen.</li>
        </ul>
      </Section>

      <Section title="Pembayaran & Harga">
        <p>
          Harga dapat berubah sewaktu-waktu mengikuti kebijakan publisher & biaya gateway.
          Semua transaksi dicatat dan dapat dilacak pada halaman riwayat/checkout.
        </p>
      </Section>

      <Section title="Pengembalian Dana (Refund)">
        <p>
          Refund dilakukan apabila pesanan gagal terproses dan saldo belum dikreditkan.
          Proses verifikasi maksimal 1×24 jam hari kerja.
        </p>
      </Section>

      <Section title="Batasan Tanggung Jawab">
        <p>
          Kami tidak bertanggung jawab atas kerugian yang timbul dari kesalahan input pengguna,
          pembatasan akun oleh publisher, atau gangguan layanan pihak ketiga.
        </p>
      </Section>
    </main>
  );
}
