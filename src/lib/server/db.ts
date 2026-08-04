import { createClient } from '@libsql/client';

let _client: ReturnType<typeof createClient> | null = null;

export function getTurso() {
	if (!_client) {
		_client = createClient({
			url: process.env.TURSO_DATABASE_URL!,
			authToken: process.env.TURSO_AUTH_TOKEN!
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
