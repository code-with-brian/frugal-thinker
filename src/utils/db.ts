import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../models/schema.ts';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const isProd = process.env.NODE_ENV === 'production';
const sqlite = new Database('./db.sqlite3');

export const db = drizzle(sqlite, { schema });
console.log(db);

try {
  migrate(db, { migrationsFolder: './drizzle' });
  console.log("Migrations applied successfully.");
} catch (error) {
  console.log("Failed to apply migrations:", error);
}
