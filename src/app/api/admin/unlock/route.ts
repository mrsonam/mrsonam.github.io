import { NextResponse } from "next/server";
import { ADMIN_NAV_UNLOCK_COOKIE } from "@/lib/admin-nav";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_NAV_UNLOCK_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}
