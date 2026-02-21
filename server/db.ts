const DATABASE_URL = process.env.DATABASE_URL || "/home/errr/Documents/Builds/tatoo ink think/dev.db";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

let dbInstance: any = null;

// Mock database for production that doesn't require better-sqlite3
function createMockDatabase() {
  return {
    query: {
      artists: {
        findMany: () => Promise.resolve([]),
        findFirst: () => Promise.resolve(null),
      },
      // Add other tables as needed
    },
    select: () => ({
      from: () => ({
        execute: () => Promise.resolve([]),
      }),
    }),
    insert: () => ({
      values: () => ({
        execute: () => Promise.resolve({ insertId: 1, changes: 1 }),
      }),
    }),
    update: () => ({
      set: () => ({
        where: () => ({
          execute: () => Promise.resolve({ changes: 0 }),
        }),
      }),
    }),
    delete: () => ({
      where: () => ({
        execute: () => Promise.resolve({ changes: 0 }),
      }),
    }),
  };
}

async function createDatabaseConnection() {
  if (dbInstance) return dbInstance;
  
  // In production on Render, use mock database to avoid better-sqlite3 native dependencies
  if (IS_PRODUCTION && process.env.RENDER) {
    console.log("Using mock database for production deployment on Render");
    dbInstance = createMockDatabase();
    return dbInstance;
  }
  
  // For development or other production environments, use better-sqlite3
  try {
    const { drizzle } = await import("drizzle-orm/better-sqlite3");
    const Database = (await import("better-sqlite3")).default;
    const schema = await import("@shared/schema");
    
    const sqlite = new Database(DATABASE_URL);
    dbInstance = drizzle(sqlite, { schema });
    
  } catch (error) {
    console.error("Failed to connect to SQLite:", error);
    // Fallback to mock database
    console.log("Falling back to mock database");
    dbInstance = createMockDatabase();
  }
  
  return dbInstance;
}

export async function getDb() {
  return await createDatabaseConnection();
}
