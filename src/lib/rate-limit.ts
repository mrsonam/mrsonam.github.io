/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * State is per server instance, so this is best-effort on serverless —
 * enough to blunt passcode brute-forcing for a single-admin site without
 * extra infrastructure.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

export type RateLimitResult = {
  ok: boolean;
  /** Seconds until the window resets; only meaningful when `ok` is false. */
  retryAfterSeconds: number;
};

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  current.count += 1;
  if (current.count > limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }
  return { ok: true, retryAfterSeconds: 0 };
}

/** Clears the window for a key (e.g. after a successful login). */
export function resetRateLimit(key: string): void {
  windows.delete(key);
}
