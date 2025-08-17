"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Gamepad2, ShoppingBag } from "lucide-react";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      className={[
        "rounded-xl px-3 py-2 text-sm transition",
        active
          ? "bg-white/10 text-white backdrop-blur dark:bg-neutral-800"
          : "hover:bg-white/10 hover:text-white/90",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem("cart");
        const arr = raw ? JSON.parse(raw) : [];
        setCount(Array.isArray(arr) ? arr.length : 0);
      } catch {
        setCount(0);
      }
    };
    read();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cart") read();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 -mx-4 mb-6 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Gamepad2 className="h-6 w-6 text-indigo-400" />
          <span className="text-lg font-semibold tracking-tight">
            Ciel Top Up
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink href="/">Beranda</NavLink>
          <NavLink href="/how-to">Cara Beli</NavLink>
          <NavLink href="/garansi">Garansi</NavLink>
          <NavLink href="/bantuan">Bantuan</NavLink>
        </nav>

        {/* Checkout */}
        <Link
          href="/checkout"
          className="relative inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm shadow-sm backdrop-blur transition hover:border-white/25 hover:bg-white/10"
        >
          <ShoppingBag className="h-4 w-4" />
          Checkout
          {count > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-indigo-500 px-1 text-[10px] font-bold text-white shadow">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
