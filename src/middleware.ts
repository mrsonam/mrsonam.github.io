import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ADMIN_NAV_UNLOCK_COOKIE } from "@/lib/admin-nav";
import { getAuthSecretKey } from "@/lib/env";

const LOGIN = "/admin/login";

function isLoginPath(pathname: string) {
  return pathname === LOGIN || pathname.startsWith(`${LOGIN}/`);
}

const unlockCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    if (request.cookies.get(ADMIN_NAV_UNLOCK_COOKIE)?.value === "1") {
      const res = NextResponse.next();
      res.cookies.set(ADMIN_NAV_UNLOCK_COOKIE, "", {
        ...unlockCookieOptions,
        maxAge: 0,
      });
      return res;
    }
    return NextResponse.next();
  }

  if (!pathname.startsWith("/admin")) {
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

  const token = request.cookies.get("admin_session")?.value;
  if (token) {
    try {
      await jwtVerify(token, secretKey);
      return NextResponse.next();
    } catch {
      // Invalid or expired session — fall through to gate / login-only rules.
    }
  }

  const gateOk =
    request.cookies.get(ADMIN_NAV_UNLOCK_COOKIE)?.value === "1";

  if (gateOk && isLoginPath(pathname)) {
    return NextResponse.next();
  }

  if (gateOk && !isLoginPath(pathname)) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/", "/admin", "/admin/:path*"],
};
