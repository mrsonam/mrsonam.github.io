import { SignJWT, jwtVerify } from "jose";
import { getAuthSecretKey } from "@/lib/env";

export const ADMIN_COOKIE = "admin_session";

export async function signAdminSessionToken(): Promise<string> {
  return new SignJWT({ sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getAuthSecretKey());
}

export async function verifyAdminSessionToken(token: string): Promise<void> {
  await jwtVerify(token, getAuthSecretKey());
}
