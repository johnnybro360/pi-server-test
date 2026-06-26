import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import "dotenv/config";

const isProd = process.env.NODE_ENV === "production";
const dbPath = process.env.DB_FILE_NAME;

if (!dbPath) throw new Error("DB_FILE_NAME is missing");

const sqlite = new Database(dbPath);

sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

if (isProd) {
  // WAL mode ON (IMPORTANT)
  sqlite.pragma("synchronous = NORMAL");
  sqlite.pragma("temp_store = MEMORY");
  sqlite.pragma("cache_size = 10000");
  sqlite.pragma("mmap_size = 134217728"); // 128MB safer default
}

export const db = drizzle({ client: sqlite });
