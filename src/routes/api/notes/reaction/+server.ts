import { turso } from '$lib/server/db';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const reactionTimestamps = new Map<string, number>();
const REACTION_COOLDOWN = 5000;

export const PATCH: RequestHandler = async ({ request, getClientAddress }) => {
	const { id } = await request.json();
	const ip = getClientAddress();

	if (typeof id !== 'number') {
		throw error(400, 'Invalid note ID.');
	}

	const key = `${ip}:${id}`;
	const now = Date.now();
	const lastReaction = reactionTimestamps.get(key);

	if (lastReaction && now - lastReaction < REACTION_COOLDOWN) {
		throw error(429, 'Too many reactions. Wait a moment.');
	}

	const result = await turso.execute({
		sql: 'UPDATE notes SET reactions = reactions + 1 WHERE id = ?',
		args: [id]
	});

	if (result.rowsAffected === 0) {
		throw error(404, 'Note not found.');
	}

	reactionTimestamps.set(key, now);

	return json({ success: true });
};
