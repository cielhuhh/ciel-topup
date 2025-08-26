export const metadata = {
  title: "Kebijakan Privasi — Ciel Top Up",
  description:
    "Penjelasan bagaimana Ciel Top Up mengumpulkan, menggunakan, dan melindungi data pribadi.",
};

export default function PrivacyPage() {
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="card p-6 sm:p-8">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 prose prose-invert prose-sm sm:prose-base max-w-none">{children}</div>
    </section>
  );

  return (
    <main className="container-px py-10 space-y-6">
      {/* isi sama dengan kode kamu */}
    </main>
  );
}
