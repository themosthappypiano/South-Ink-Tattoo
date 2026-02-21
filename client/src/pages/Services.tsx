import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-4">
        <SectionHeader title="Services." center className="mb-20" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {/* Style Based */}
          <div>
            <h3 className="text-3xl font-display text-white mb-8 border-b border-zinc-800 pb-4">By Style</h3>
            <div className="space-y-8">
              {[
                { title: "Blackwork", desc: "Heavy saturation. Bold lines. High contrast. Built to hold." },
                { title: "Realism", desc: "Photographic detail. Smooth shading. Depth and dimension." },
                { title: "Custom Script", desc: "Hand-drawn typography. No computer fonts. Flowing with the body." },
                { title: "Neo-Traditional", desc: "Classic imagery. Modern techniques. Muted color palettes." }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <h4 className="text-xl text-primary font-bold mb-2 group-hover:translate-x-2 transition-transform">{service.title}</h4>
                  <p className="text-gray-400 font-light">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Size Based */}
          <div>
            <h3 className="text-3xl font-display text-white mb-8 border-b border-zinc-800 pb-4">By Size</h3>
            <div className="space-y-8">
              {[
                { title: "Small Pieces", desc: "1-2 hour sessions. Simple concepts. Minimal detail." },
                { title: "Half Day Session", desc: "4 hours. Larger standalone pieces. Forearm/Calf coverage." },
                { title: "Full Day Session", desc: "7-8 hours. Sleeves. Backpieces. Complex realism." },
                { title: "Multi-Day Projects", desc: "Consecutive days for bodysuits and large scale work." }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <h4 className="text-xl text-white font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h4>
                  <p className="text-gray-400 font-light">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border border-zinc-900 p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          <h3 className="text-2xl font-display text-white mb-4">Pricing Disclaimer</h3>
          <p className="text-gray-400 mb-8 font-light">
            Every piece is custom. Final pricing is confirmed only after consultation. Deposits are non-refundable and go towards the final cost of the tattoo.
          </p>
          <Link href="/book">
            <Button className="bg-primary text-black px-10 py-6 font-bold uppercase tracking-widest rounded-none hover:bg-white transition-all">
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
