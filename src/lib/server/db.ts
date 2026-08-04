import { createClient } from '@libsql/client';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';

export const turso = createClient({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN
});

export async function initializeDatabase() {
	await turso.batch([
		`CREATE TABLE IF NOT EXISTS notes (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			content TEXT NOT NULL,
			category TEXT NOT NULL DEFAULT 'general',
			reactions INTEGER DEFAULT 0,
			created_at TEXT DEFAULT (datetime('now'))
		)`,
		'CREATE INDEX IF NOT EXISTS idx_notes_category ON notes(category)',
		'CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC)'
	]);
}
