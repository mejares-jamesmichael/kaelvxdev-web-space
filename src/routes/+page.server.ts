import { turso } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const { rows } = await turso.execute(
			'SELECT * FROM notes ORDER BY created_at DESC LIMIT 3'
		);

		return {
			recentNotes: rows.map((row) => ({
				id: Number(row.id),
				content: String(row.content),
				category: String(row.category),
				reactions: Number(row.reactions),
				created_at: String(row.created_at)
			}))
		};
	} catch {
		return { recentNotes: [] };
	}
};
