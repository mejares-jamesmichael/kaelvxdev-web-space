import { getTurso } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

const RATE_LIMIT_MS = 60000;
const submissionTimestamps = new Map<string, number>();

export const load: PageServerLoad = async ({ url }) => {
  const category = url.searchParams.get('category');

  let query = 'SELECT * FROM notes';
  const args: string[] = [];

  if (category && category !== 'all') {
    query += ' WHERE category = ?';
    args.push(category);
  }

  query += ' ORDER BY created_at DESC';

	const { rows } = await getTurso().execute({ sql: query, args });

  return {
    notes: rows.map((row) => ({
      id: Number(row.id),
      content: String(row.content),
      category: String(row.category),
      reactions: Number(row.reactions),
      created_at: String(row.created_at)
    }))
  };
};

export const actions: Actions = {
  default: async ({ request, getClientAddress }) => {
    const formData = await request.formData();
    const content = formData.get('content')?.toString().trim();
    const category = formData.get('category')?.toString() ?? 'general';
    const ip = getClientAddress();

    if (!content) {
      return fail(400, { error: 'Note content is required.' });
    }

    if (content.length > 500) {
      return fail(400, { error: 'Note must be 500 characters or less.' });
    }

    const validCategories = ['general', 'feedback', 'question', 'compliment', 'thought'];
    if (!validCategories.includes(category)) {
      return fail(400, { error: 'Invalid category.' });
    }

    const now = Date.now();
    const lastSubmission = submissionTimestamps.get(ip);
    if (lastSubmission && now - lastSubmission < RATE_LIMIT_MS) {
      const waitSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmission)) / 1000);
      return fail(429, { error: `Slow down! Try again in ${waitSeconds}s.` });
    }

		await getTurso().execute({
			sql: 'INSERT INTO notes (content, category) VALUES (?, ?)',
			args: [content, category]
		});

    submissionTimestamps.set(ip, now);

    return { success: true };
  }
};
