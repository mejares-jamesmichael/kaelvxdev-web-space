import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Fallback to test webhook URL if env var not set
const TEST_WEBHOOK_URL = 'https://automate.kaelvxdev.space/webhook-test/c0f41a69-197e-4f33-a344-edfd55732518';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { message } = await request.json();

    if (!message) {
      return json({ error: 'Message is required' }, { status: 400 });
    }

    const webhookUrl = env.N8N_WEBHOOK_URL || TEST_WEBHOOK_URL;

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatInput: message })
    });

    if (!response.ok) {
      throw new Error(`n8n responded with ${response.status}`);
    }

    const data = await response.json();
    
    // n8n returns an array: [{ "output": "..." }]
    let botText = "Response received.";
    
    if (Array.isArray(data) && data.length > 0) {
      // Handle array response from n8n
      botText = data[0].output || data[0].text || data[0].message || botText;
    } else if (typeof data === 'object') {
      // Handle object response
      botText = data.output || data.text || data.message || botText;
    }

    return json({ text: botText });

  } catch (error) {
    console.error('Chat API Error:', error);
    return json({ error: 'Failed to communicate with AI core.' }, { status: 500 });
  }
};
