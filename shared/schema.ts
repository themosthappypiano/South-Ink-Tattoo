import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const artists = sqliteTable("artists", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const portfolioItems = sqliteTable("portfolio_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  artistId: integer("artist_id").references(() => artists.id).notNull(),
  imageUrl: text("image_url").notNull(),
  style: text("style").notNull(),
  sizeCategory: text("size_category").notNull(),
});

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  artistId: integer("artist_id").references(() => artists.id).notNull(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  concept: text("concept").notNull(),
  placement: text("placement").notNull(),
  sizeEstimate: text("size_estimate").notNull(),
  bookingDate: integer("booking_date", { mode: "timestamp" }).notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(Date.now()),
});

export const insertArtistSchema = createInsertSchema(artists).omit({ id: true });
export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true, status: true }).extend({
  bookingDate: z.coerce.date()
});

export type Artist = typeof artists.$inferSelect;
export type InsertArtist = z.infer<typeof insertArtistSchema>;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
