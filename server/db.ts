const DATABASE_URL = process.env.DATABASE_URL || "/home/errr/Documents/Builds/tatoo ink think/dev.db";

let dbInstance: any = null;

async function createDatabaseConnection() {
  if (dbInstance) return dbInstance;
  
  // Force PostgreSQL in production or when DATABASE_URL is postgres
  if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL?.startsWith("postgres")) {
    // Production: Use PostgreSQL
    try {
      const { drizzle } = await import("drizzle-orm/node-postgres");
      const { Pool } = await import("pg");
      const schema = await import("@shared/schema-pg");
      
      // Require valid DATABASE_URL in production
      const connectionString = process.env.DATABASE_URL;
      if (!connectionString || connectionString === "postgresql://placeholder") {
        throw new Error("DATABASE_URL environment variable is required for PostgreSQL connection in production");
      }
      
      const pool = new Pool({
        connectionString,
        ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false }
      });
      
      dbInstance = drizzle(pool, { schema });
    } catch (error) {
      console.error("Failed to connect to PostgreSQL:", error);
      throw new Error("PostgreSQL connection required in production. Please set DATABASE_URL environment variable.");
    }
  } else {
    // Development: Use SQLite
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
  }
  
  return dbInstance;
}

export async function getDb() {
  return await createDatabaseConnection();
}
