import { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'estoque.db';

export async function migrate(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE COLLATE NOCASE,
      price REAL NOT NULL CHECK (price >= 0),
      quantity INTEGER NOT NULL CHECK (quantity >= 0)
    );

    CREATE TABLE IF NOT EXISTS stock_exits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
    );

    INSERT OR IGNORE INTO users (username, password) VALUES ('admin', 'admin');
  `);
}
