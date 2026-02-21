import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL || "/home/errr/Documents/Builds/tatoo ink think/dev.db";

export default defineConfig({
  out: "./migrations",
  schema: process.env.NODE_ENV === "production" || process.env.DATABASE_URL?.startsWith("postgres")
    ? "./shared/schema-pg.ts"
    : "./shared/schema.ts",
  dialect: process.env.NODE_ENV === "production" || process.env.DATABASE_URL?.startsWith("postgres")
    ? "postgresql"
    : "sqlite",
  dbCredentials: process.env.NODE_ENV === "production" || process.env.DATABASE_URL?.startsWith("postgres")
    ? { url: process.env.DATABASE_URL || "postgresql://placeholder" }
    : { url: "file:dev.db" },
});
