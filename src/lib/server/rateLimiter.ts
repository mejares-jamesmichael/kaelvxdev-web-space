export const RATE_LIMIT = 10;
export const RATE_LIMIT_WINDOW = 60 * 1000;

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

/**
 * Checks if an IP is rate limited.
 *
 * @param ip The IP address to check
 * @param now Optional current time in milliseconds (useful for testing)
 * @returns true if rate limited, false otherwise
 */
export function isRateLimited(ip: string, now: number = Date.now()): boolean {
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * Clears the rate limit map. Useful for testing.
 */
export function clearRateLimits(): void {
  rateLimitMap.clear();
}
