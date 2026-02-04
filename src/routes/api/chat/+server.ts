import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { message } = await request.json();

    if (!message) {
      return json({ error: 'Message is required' }, { status: 400 });
    }

    const webhookUrl = env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('[Chat API] N8N_WEBHOOK_URL environment variable is not set');
      return json({ error: 'Server configuration error' }, { status: 500 });
    }

    console.log('[Chat API] Sending request to n8n webhook');
    console.log('[Chat API] Message:', message);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatInput: message })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Chat API] n8n error:', response.status, errorText);
      throw new Error(`n8n responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('[Chat API] Received data:', JSON.stringify(data, null, 2));
    
    // n8n returns an array: [{ "output": "..." }]
    let botText = "Response received.";
    
    if (Array.isArray(data) && data.length > 0) {
      // Handle array response from n8n
      botText = data[0].output || data[0].text || data[0].message || botText;
    } else if (typeof data === 'object') {
      // Handle object response
      botText = data.output || data.text || data.message || botText;
    }

    console.log('[Chat API] Returning bot text length:', botText.length);
    return json({ text: botText });

  } catch (error) {
    console.error('[Chat API] Error:', error);
    return json({ error: 'Failed to communicate with AI core.' }, { status: 500 });
  }
};
