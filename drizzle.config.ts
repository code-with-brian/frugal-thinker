import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/models/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  verbose: true,
  strict: true,
  dbCredentials: {
    url:
      process.env.NODE_ENV === 'production'
        ? '/data/db.sqlite3'
        : './db.sqlite3'
  }
} satisfies Config;