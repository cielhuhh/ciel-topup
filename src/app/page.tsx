export const metadata = {
  title: "Ciel Top Up — Top Up Game Cepat & Aman",
  description:
    "Top up game favoritmu dengan QRIS, E-Wallet, dan VA. Proses cepat, garansi aman, dan status pesanan real-time.",
};

import HomeClient from "@/components/HomeClient";

export default function Page() {
  // Server component tipis: render komponen client yang pegang interaksi
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20">
      <HomeClient />
    </main>
  );
}
