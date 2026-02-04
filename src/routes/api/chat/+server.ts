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
    
    // Adjust this based on your actual n8n output structure
    // Assuming n8n returns { "output": "Bot response text" } or similar
    const botText = data.output || data.text || data.message || "Response received.";

    return json({ text: botText });

  } catch (error) {
    console.error('Chat API Error:', error);
    return json({ error: 'Failed to communicate with AI core.' }, { status: 500 });
  }
};
