// In-memory rate limiter (per-process; resets on serverless cold start).
// Good enough to slow brute-force at the admin login; not a substitute for
// proper distributed rate limiting (e.g. Upstash) on a higher-traffic app.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Periodic cleanup so a long-running process doesn't accumulate stale keys.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }, 5 * 60 * 1000).unref?.();
}

/**
 * Returns true if the request should be BLOCKED.
 * Increments the counter on every call; pair with `reset()` on success
 * if you only want to count failed attempts.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count++;
  return bucket.count > limit;
}

/** Clear the counter for a key (e.g. after a successful login). */
export function rateLimitReset(key: string): void {
  buckets.delete(key);
}
