import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

const DATABASE_URL = process.env.DATABASE_URL || "/home/errr/Documents/Builds/tatoo ink think/dev.db";

export const sqlite = new Database(DATABASE_URL);
export const db = drizzle(sqlite, { schema });
