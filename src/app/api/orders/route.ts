import { NextResponse } from "next/server";

type CreateOrderBody = {
  gameId: string;
  denomCode: string;
  playerId: string;
  serverId?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<CreateOrderBody>;

    if (!body?.gameId || !body?.denomCode || !body?.playerId) {
      return NextResponse.json(
        { error: "Data tidak lengkap: gameId, denomCode, playerId wajib." },
        { status: 400 }
      );
    }

    // TODO: simpan ke DB di produksi
    const orderId = `ord_${Math.random().toString(36).slice(2, 10)}`;

    return NextResponse.json({
      orderId,
      status: "PENDING_PAYMENT",
      gameId: body.gameId,
      denomCode: body.denomCode,
      playerId: body.playerId,
      serverId: body.serverId ?? null,
      totalPrice: null,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal memproses order." },
      { status: 500 }
    );
  }
}
