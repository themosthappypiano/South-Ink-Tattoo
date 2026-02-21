import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type BookingInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// Artists Hooks
export function useArtists() {
  return useQuery({
    queryKey: [api.artists.list.path],
    queryFn: async () => {
      const res = await fetch(api.artists.list.path);
      if (!res.ok) throw new Error("Failed to fetch artists");
      return api.artists.list.responses[200].parse(await res.json());
    },
  });
}

export function useArtist(id: number) {
  return useQuery({
    queryKey: [api.artists.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.artists.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch artist");
      return api.artists.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// Portfolio Hooks
export function usePortfolio(artistId?: string, style?: string) {
  return useQuery({
    queryKey: [api.portfolio.list.path, artistId, style],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (artistId) queryParams.append("artistId", artistId);
      if (style && style !== "All") queryParams.append("style", style);
      
      const url = `${api.portfolio.list.path}?${queryParams.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch portfolio");
      return api.portfolio.list.responses[200].parse(await res.json());
    },
  });
}

// Booking Hook
export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: BookingInput) => {
      const res = await fetch(api.bookings.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create booking");
      }
      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "REQUEST RECEIVED",
        description: "Your booking request has been submitted. We will contact you shortly.",
        variant: "default",
        className: "bg-primary text-black border-none font-bold",
      });
      // Invalidate queries if necessary, though bookings list isn't public
    },
    onError: (error) => {
      toast({
        title: "SUBMISSION FAILED",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
