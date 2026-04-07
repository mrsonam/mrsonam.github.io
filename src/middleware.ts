import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getAuthSecretKey } from "@/lib/env";

const LOGIN = "/admin/login";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }
  if (pathname === LOGIN || pathname.startsWith(`${LOGIN}/`)) {
    return NextResponse.next();
  }

  let secretKey: Uint8Array;
  try {
    secretKey = getAuthSecretKey();
  } catch {
    return new NextResponse("Admin unavailable: AUTH_SECRET is not configured.", {
      status: 500,
    });
  }

  try {
    const token = request.cookies.get("admin_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL(LOGIN, request.url));
    }
    await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
