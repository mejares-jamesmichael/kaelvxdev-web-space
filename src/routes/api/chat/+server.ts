import { N8N_WEBHOOK_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { message } = await request.json();

    if (!message) {
      return json({ error: 'Message is required' }, { status: 400 });
    }

    if (!N8N_WEBHOOK_URL) {
      console.error('N8N_WEBHOOK_URL is not defined');
      return json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(N8N_WEBHOOK_URL, {
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
