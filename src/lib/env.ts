/**
 * Server and Edge–safe environment accessors.
 * Do not import from client components.
 */

export function getAuthSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET is not set. Add a long random string to your environment.",
    );
  }
  return new TextEncoder().encode(secret);
}
