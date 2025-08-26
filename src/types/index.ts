// src/types/index.ts
export type Platform = "android" | "ios" | "pc" | "web";

export interface Denomination {
  id: string;
  label: string;        // "86 Diamonds", "Weekly Pass", dst.
  amount: number;       // angka murni, kalau bukan numeric, biarkan 0
  price: number;        // harga dalam IDR
  bestSeller?: boolean;
  bonusText?: string;   // "Bonus +8", dll
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  category: "popular" | "moba" | "rpg" | "casual" | "topup" | "voucher";
  image: string;           // url icon / poster
  banner?: string;         // url banner besar
  platform?: Platform[];
  denominations: Denomination[];
  publisher?: string;
  tags?: string[];
}

export interface PaymentMethod {
  id: string;
  name: string;          // "QRIS", "Gopay", dll
  feePercent?: number;
  fixedFee?: number;
  logo?: string;         // url logo
  channel?: "ewallet" | "bank" | "retail" | "qris" | "card";
  enabled: boolean;
}

export interface SupportFormData {
  orderId?: string;
  email: string;
  topic: "order" | "payment" | "account" | "other";
  message: string;
  attachments?: File[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
