import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL || "/home/errr/Documents/Builds/tatoo ink think/dev.db";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:dev.db",
  },
});
