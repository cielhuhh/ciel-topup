export const metadata = {
  title: "Kebijakan Privasi — Ciel Top Up",
  description:
    "Penjelasan bagaimana Ciel Top Up mengumpulkan, menggunakan, dan melindungi data pribadi.",
};

export default function PrivacyPage() {
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
        <h1 className="text-2xl sm:text-3xl font-bold">Kebijakan Privasi</h1>
        <p className="mt-2 text-white/90">
          Berlaku efektif: 01 Januari 2025
        </p>
      </header>

      <Section title="Data yang Kami Kumpulkan">
        <ul>
          <li>Identitas akun game (UID/Server) untuk memproses top up.</li>
          <li>Informasi transaksi & metode pembayaran (tanpa menyimpan detail sensitif).</li>
          <li>Data perangkat/analitik anonim untuk peningkatan layanan.</li>
        </ul>
      </Section>

      <Section title="Cara Penggunaan">
        <p>
          Data digunakan untuk memproses pesanan, verifikasi, pencegahan penyalahgunaan,
          dukungan pelanggan, serta analitik kinerja (agregat).
        </p>
      </Section>

      <Section title="Berbagi Data">
        <p>
          Kami membagikan data terbatas ke mitra pembayaran & penyedia integrasi (mis. publisher game)
          hanya untuk tujuan operasional. Tidak diperjualbelikan.
        </p>
      </Section>

      <Section title="Keamanan">
        <p>
          Enkripsi in-transit (HTTPS), pembatasan akses, audit internal, dan idempoten webhook diterapkan
          untuk menjaga integritas transaksi.
        </p>
      </Section>

      <Section title="Hak Pengguna">
        <ul>
          <li>Meminta salinan/korigasi data.</li>
          <li>Meminta penghapusan sesuai regulasi yang berlaku.</li>
          <li>Mencabut persetujuan pemrosesan non-esensial.</li>
        </ul>
        <p className="mt-2">
          Hubungi: <a href="mailto:privacy@ciel.id">privacy@ciel.id</a>
        </p>
      </Section>
    </main>
  );
}
