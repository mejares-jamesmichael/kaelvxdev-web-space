import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Simple memory-based rate limiter
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 10; // requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
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

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  try {
    const ip = getClientAddress();
    if (isRateLimited(ip)) {
      return json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { message } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return json({ error: 'Message is required' }, { status: 400 });
    }

    // Basic sanitization
    const sanitizedMessage = message.trim().substring(0, 1000);

    const webhookUrl = env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('[Chat API] N8N_WEBHOOK_URL environment variable is not set');
      return json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (dev) {
      console.log('[Chat API] Sending request to n8n webhook');
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatInput: sanitizedMessage }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Chat API] n8n error:', response.status, errorText);
      return json({ error: 'Failed to communicate with AI core.' }, { status: 500 });
    }

    // Proxy the stream from n8n to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });

  } catch (error) {
    console.error('[Chat API] Error:', error);
    return json({ error: 'Internal server error.' }, { status: 500 });
  }
};

