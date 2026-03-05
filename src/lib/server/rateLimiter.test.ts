import { test } from 'node:test';
import assert from 'node:assert';
import { isRateLimited, clearRateLimits, RATE_LIMIT, RATE_LIMIT_WINDOW } from './rateLimiter.ts';

test('isRateLimited', async (t) => {
  await t.test('should allow the first request', () => {
    clearRateLimits();
    const ip = '1.1.1.1';
    assert.strictEqual(isRateLimited(ip), false);
  });

  await t.test('should allow requests up to the limit', () => {
    clearRateLimits();
    const ip = '2.2.2.2';
    for (let i = 0; i < RATE_LIMIT; i++) {
      assert.strictEqual(isRateLimited(ip), false, `Request ${i + 1} should be allowed`);
    }
  });

  await t.test('should block requests exceeding the limit', () => {
    clearRateLimits();
    const ip = '3.3.3.3';
    for (let i = 0; i < RATE_LIMIT; i++) {
      isRateLimited(ip);
    }
    assert.strictEqual(isRateLimited(ip), true, 'Request exceeding limit should be blocked');
  });

  await t.test('should reset after the window passes', () => {
    clearRateLimits();
    const ip = '4.4.4.4';
    const start = 1000;

    // Fill up the limit
    for (let i = 0; i < RATE_LIMIT; i++) {
      isRateLimited(ip, start);
    }
    assert.strictEqual(isRateLimited(ip, start), true, 'Should be blocked at start');

    // After window
    const afterWindow = start + RATE_LIMIT_WINDOW + 1;
    assert.strictEqual(isRateLimited(ip, afterWindow), false, 'Should be allowed after window');
  });

  await t.test('should handle different IPs independently', () => {
    clearRateLimits();
    const ip1 = '5.5.5.5';
    const ip2 = '6.6.6.6';

    for (let i = 0; i < RATE_LIMIT; i++) {
      isRateLimited(ip1);
    }
    assert.strictEqual(isRateLimited(ip1), true, 'IP1 should be blocked');
    assert.strictEqual(isRateLimited(ip2), false, 'IP2 should still be allowed');
  });
});
