import { NextResponse } from "next/server";

type CreatePaymentBody = {
  orderId: string;
  method?: "QRIS" | "EWALLET" | "VA";
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<CreatePaymentBody>;
    if (!body?.orderId) {
      return NextResponse.json({ error: "Order ID wajib." }, { status: 400 });
    }

    // TODO: panggil Midtrans/Xendit sandbox di produksi
    const method = body.method ?? "QRIS";
    const paymentUrl = `https://example.com/pay/${body.orderId}`;

    return NextResponse.json({
      orderId: body.orderId,
      method,
      paymentUrl,
      provider: "MOCK",
      status: "PENDING",
      issuedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal membuat sesi pembayaran." },
      { status: 500 }
    );
  }
}
