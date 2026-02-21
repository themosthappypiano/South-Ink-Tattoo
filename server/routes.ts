import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Artists
  app.get(api.artists.list.path, async (req, res) => {
    const items = await storage.getArtists();
    res.json(items);
  });

  app.get(api.artists.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const item = await storage.getArtist(id);
    if (!item) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json(item);
  });

  // Portfolio
  app.get(api.portfolio.list.path, async (req, res) => {
    const artistId = req.query.artistId ? Number(req.query.artistId) : undefined;
    const style = req.query.style ? String(req.query.style) : undefined;
    
    const items = await storage.getPortfolioItems(artistId, style);
    res.json(items);
  });

  // Bookings
  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const booking = await storage.createBooking(input);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data function to be called at startup if db is empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingArtists = await storage.getArtists();
  if (existingArtists.length === 0) {
    const artist1 = await storage.createArtist({
      name: "Jaxen",
      specialty: "Blackwork & Dark Realism",
      bio: "Jaxen specializes in high-contrast blackwork, focusing on intricate textures and aggressive compositions. No trends, just permanent art.",
      imageUrl: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=600&auto=format&fit=crop", 
    });

    const artist2 = await storage.createArtist({
      name: "Lena",
      specialty: "Script & Fine Line",
      bio: "Lena brings elegance and sharp precision. Every line intentional. Perfect for custom concepts and fine detail.",
      imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=600&auto=format&fit=crop", 
    });

    await storage.createPortfolioItem({
      artistId: artist1.id,
      imageUrl: "https://images.unsplash.com/photo-1565058379802-bbe93b2638ac?w=800&h=800&fit=crop",
      style: "Blackwork",
      sizeCategory: "Large",
    });

    await storage.createPortfolioItem({
      artistId: artist1.id,
      imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&h=800&fit=crop",
      style: "Realism",
      sizeCategory: "Medium",
    });

    await storage.createPortfolioItem({
      artistId: artist1.id,
      imageUrl: "https://images.unsplash.com/photo-1590246814883-57c511e88346?w=800&h=800&fit=crop",
      style: "Traditional",
      sizeCategory: "Small",
    });
  }
}
