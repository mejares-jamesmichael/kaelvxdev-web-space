import { createClient } from '@libsql/client/http';

let _client: ReturnType<typeof createClient> | null = null;

export function getTurso() {
	if (!_client) {
		const url = process.env.TURSO_DATABASE_URL;
		const token = process.env.TURSO_AUTH_TOKEN;
		console.log('[db] TURSO_DATABASE_URL defined:', !!url);
		console.log('[db] TURSO_AUTH_TOKEN defined:', !!token);
		_client = createClient({
			url: url!,
			authToken: token!
		});
	}
	return _client;
}

export async function initializeDatabase() {
	await getTurso().batch([
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
