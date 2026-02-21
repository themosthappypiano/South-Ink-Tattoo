import { getDb } from "./db";
import {
  artists,
  portfolioItems,
  bookings,
  type Artist,
  type InsertArtist,
  type PortfolioItem,
  type InsertPortfolioItem,
  type Booking,
  type InsertBooking
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Artists
  getArtists(): Promise<Artist[]>;
  getArtist(id: number): Promise<Artist | undefined>;
  createArtist(artist: InsertArtist): Promise<Artist>;

  // Portfolio
  getPortfolioItems(artistId?: number, style?: string): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;

  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class DatabaseStorage implements IStorage {
  async getArtists(): Promise<Artist[]> {
    const db = await getDb();
    return await db.select().from(artists);
  }

  async getArtist(id: number): Promise<Artist | undefined> {
    const db = await getDb();
    const [artist] = await db.select().from(artists).where(eq(artists.id, id));
    return artist;
  }

  async createArtist(artist: InsertArtist): Promise<Artist> {
    const db = await getDb();
    const [created] = await db.insert(artists).values(artist).returning();
    return created;
  }

  async getPortfolioItems(artistId?: number, style?: string): Promise<PortfolioItem[]> {
    const db = await getDb();
    let query = db.select().from(portfolioItems);
    
    const allItems = await query;
    let filtered = allItems;
    
    if (artistId) {
      filtered = filtered.filter((item: PortfolioItem) => item.artistId === artistId);
    }
    
    if (style && style !== 'All') {
      filtered = filtered.filter((item: PortfolioItem) => item.style.toLowerCase() === style.toLowerCase());
    }
    
    return filtered;
  }

  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    const db = await getDb();
    const [created] = await db.insert(portfolioItems).values(item).returning();
    return created;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const db = await getDb();
    const [created] = await db.insert(bookings).values(booking).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
