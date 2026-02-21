const DATABASE_URL = process.env.DATABASE_URL || "/home/errr/Documents/Builds/tatoo ink think/dev.db";

let dbInstance: any = null;

async function createDatabaseConnection() {
  if (dbInstance) return dbInstance;
  
  try {
    const { drizzle } = await import("drizzle-orm/better-sqlite3");
    const Database = (await import("better-sqlite3")).default;
    const schema = await import("@shared/schema");
    
    const sqlite = new Database(DATABASE_URL);
    dbInstance = drizzle(sqlite, { schema });
    
  } catch (error) {
    console.error("Failed to connect to SQLite:", error);
    throw error;
  }
  
  return dbInstance;
}

export async function getDb() {
  return await createDatabaseConnection();
}
