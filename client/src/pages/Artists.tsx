import { useArtists } from "@/hooks/use-tattoo";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import artistPlaceholder from "@assets/ChatGPT_Image_Feb_21,_2026,_09_11_03_AM_1771666895888.png"; // Fallback/Style image

export default function Artists() {
  const { data: artists, isLoading } = useArtists();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  // Single artist - ATOM
  const atomArtist = {
    id: 1,
    name: "ATOM",
    specialty: "All Styles - Traditional, Realism, Fine Line",
    bio: "Owner and master tattoo artist with years of experience. Specializes in custom pieces and brings your vision to life with incredible attention to detail.",
    imageUrl: artistPlaceholder
  };

  return (
    <div className="min-h-screen bg-black pt-48 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <SectionHeader 
            title="Meet Our Artist" 
            center
            className="mb-8"
          />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            ATOM - Master of the craft with years of experience creating permanent art.
          </p>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-card border border-zinc-900 overflow-hidden hover:border-primary/50 transition-all duration-300 max-w-md"
          >
            <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 relative">
              <img 
                src={atomArtist.imageUrl} 
                alt={atomArtist.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-primary text-xs font-bold tracking-widest uppercase mb-1">{atomArtist.specialty}</p>
                <h3 className="text-4xl font-display font-bold text-white mb-2">{atomArtist.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{atomArtist.bio}</p>
                <a href="https://www.facebook.com/southinkdublin" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-white text-black hover:bg-primary hover:text-black font-bold uppercase tracking-wide rounded-none">
                    View Profile
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
