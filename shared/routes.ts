import { z } from 'zod';
import { insertBookingSchema, artists, portfolioItems, bookings } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  artists: {
    list: {
      method: 'GET' as const,
      path: '/api/artists' as const,
      responses: {
        200: z.array(z.custom<typeof artists.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/artists/:id' as const,
      responses: {
        200: z.custom<typeof artists.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  portfolio: {
    list: {
      method: 'GET' as const,
      path: '/api/portfolio' as const,
      input: z.object({
        artistId: z.string().optional(),
        style: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof portfolioItems.$inferSelect>()),
      },
    },
  },
  bookings: {
    create: {
      method: 'POST' as const,
      path: '/api/bookings' as const,
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type BookingInput = z.infer<typeof api.bookings.create.input>;
export type BookingResponse = z.infer<typeof api.bookings.create.responses[201]>;
