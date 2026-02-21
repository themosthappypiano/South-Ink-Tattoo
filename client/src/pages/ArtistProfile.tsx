import { useArtist, usePortfolio } from "@/hooks/use-tattoo";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { motion } from "framer-motion";
import artistBg from "@assets/ChatGPT_Image_Feb_21,_2026,_09_10_07_AM_1771666894778.png";

export default function ArtistProfile() {
  const [match, params] = useRoute("/artists/:id");
  const id = params ? parseInt(params.id) : 0;
  
  const { data: artist, isLoading: artistLoading } = useArtist(id);
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio(String(id));

  if (artistLoading || portfolioLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-display mb-4">Artist Not Found</h2>
        <Link href="/artists"><Button variant="outline">Back to Artists</Button></Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Artist Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={artistBg} alt="Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="absolute top-24 left-4 md:left-12 z-20">
          <Link href="/artists">
            <Button variant="link" className="text-white hover:text-primary pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Artists
            </Button>
          </Link>
        </div>

        <div className="container relative z-10 h-full flex flex-col justify-end pb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <p className="text-primary text-lg font-bold tracking-widest uppercase mb-2">{artist.specialty}</p>
            <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-6 uppercase leading-none">{artist.name}</h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-8 border-l-2 border-primary pl-6">
              {artist.bio}
            </p>
            <Link href={`/book?artist=${artist.id}`}>
              <Button className="bg-primary text-black h-14 px-10 text-lg font-bold uppercase tracking-widest rounded-none hover:bg-white transition-all">
                Book with {artist.name.split(' ')[0]}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <SectionHeader title="Recent Work" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {portfolio?.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square relative group overflow-hidden border border-zinc-900"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.style} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-primary font-bold tracking-widest uppercase border border-primary px-4 py-2">
                    {item.style}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {!portfolio?.length && (
               <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-zinc-800">
                 Portfolio images loading...
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
