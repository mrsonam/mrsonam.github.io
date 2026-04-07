import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, database: "up" });
  } catch (e) {
    console.error("[health] database check failed:", e);
    return NextResponse.json(
      { ok: false, database: "down" },
      { status: 503 },
    );
  }
}
