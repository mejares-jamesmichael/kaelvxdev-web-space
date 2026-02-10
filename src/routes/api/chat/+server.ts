import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { message } = await request.json();

    if (!message) {
      return json({ error: 'Message is required' }, { status: 400 });
    }

    const webhookUrl = env.N8N_WEBHOOK_URL;

    if (dev) console.log('[Chat API] Webhook URL:', webhookUrl ? 'SET' : 'NOT SET');

    if (!webhookUrl) {
      console.error('[Chat API] N8N_WEBHOOK_URL environment variable is not set');
      return json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (dev) {
      console.log('[Chat API] Sending request to n8n webhook');
      console.log('[Chat API] Message:', message);
    }

    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatInput: message }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Chat API] n8n error:', response.status, errorText);
      throw new Error(`n8n responded with ${response.status}: ${errorText}`);
    }

    // n8n returns streaming NDJSON (newline-delimited JSON)
    const responseText = await response.text();
    if (dev) console.log('[Chat API] Received response text length:', responseText.length);
    
    let botText = "Response received.";
    
    // Parse streaming response - look for the last "Respond to Webhook" item
    const lines = responseText.trim().split('\n');
    if (dev) console.log('[Chat API] Received', lines.length, 'lines');
    
    // Find the last line with type "item" from "Respond to Webhook"
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const line = JSON.parse(lines[i]);
        if (line.type === 'item' && line.metadata?.nodeName === 'Respond to Webhook') {
          // Parse the content which is a JSON string
          const content = JSON.parse(line.content);
          botText = content.output || content.text || content.message || botText;
          if (dev) console.log('[Chat API] Found response in line', i);
          break;
        }
      } catch (e) {
        // Skip invalid JSON lines
        continue;
      }
    }

    if (dev) console.log('[Chat API] Returning bot text length:', botText.length);
    return json({ text: botText });

  } catch (error) {
    console.error('[Chat API] Error:', error);
    return json({ error: 'Failed to communicate with AI core.' }, { status: 500 });
  }
};
