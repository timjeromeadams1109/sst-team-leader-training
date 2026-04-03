import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Returns a Redis client only when both env vars are present.
// If either is missing, returns null and callers must fail open.
function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return null;
  }
  return new Redis({ url, token });
}

const redis = getRedisClient();

// Shared factory — builds a Ratelimit instance or null when Redis is unavailable.
function makeLimiter(requests: number, window: `${number} ${"ms" | "s" | "m" | "h" | "d"}`): Ratelimit | null {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: false,
  });
}

// 5 attempts per minute — general login
export const loginLimiter = makeLimiter(5, "1 m");

// 3 attempts per 15 minutes — admin login (tighter window)
export const adminLoginLimiter = makeLimiter(3, "15 m");

// 10 registrations per hour per IP
export const registerLimiter = makeLimiter(10, "1 h");

/**
 * Checks a rate limiter for the given identifier.
 * Returns { limited: false } when Redis is unavailable (fail-open).
 * Returns { limited: true, retryAfter } when the limit is exceeded.
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ limited: false } | { limited: true; retryAfter: number }> {
  if (!limiter) {
    console.warn("[ratelimit] Redis unavailable — failing open for identifier:", identifier);
    return { limited: false };
  }

  try {
    const { success, reset } = await limiter.limit(identifier);
    if (success) return { limited: false };

    // reset is a Unix timestamp in milliseconds
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return { limited: true, retryAfter: Math.max(retryAfter, 1) };
  } catch (err) {
    console.warn("[ratelimit] Redis error — failing open:", err);
    return { limited: false };
  }
}
