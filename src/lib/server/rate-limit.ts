import "server-only";

/**
 * Sliding-window rate limiter held in process memory.
 *
 * This protects a single server instance. On serverless or multi-instance
 * hosting each instance keeps its own window, so for stronger guarantees swap
 * this for a shared store (e.g. Upstash Redis / Vercel KV) behind the same API.
 */

type Window = { hits: number[] };

const store = new Map<string, Window>();
const MAX_KEYS = 10_000;

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number; remaining: number };

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key) ?? { hits: [] };
  entry.hits = entry.hits.filter((timestamp) => now - timestamp < windowMs);

  if (entry.hits.length >= limit) {
    const retryAfterMs = windowMs - (now - entry.hits[0]);
    store.set(key, entry);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000), remaining: 0 };
  }

  entry.hits.push(now);
  store.set(key, entry);

  if (store.size > MAX_KEYS) {
    for (const [storedKey, value] of store) {
      if (value.hits.every((timestamp) => now - timestamp >= windowMs)) store.delete(storedKey);
    }
  }

  return { allowed: true, retryAfterSeconds: 0, remaining: limit - entry.hits.length };
}
