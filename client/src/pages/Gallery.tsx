import { useState } from "react";
import { usePortfolio } from "@/hooks/use-tattoo";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const STYLES = ["All", "Blackwork", "Realism", "Script", "Traditional", "Custom"];

export default function Gallery() {
  const [activeStyle, setActiveStyle] = useState("All");
  const { data: portfolio, isLoading } = usePortfolio(undefined, activeStyle === "All" ? undefined : activeStyle);

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeader title="Proof." center className="mb-4" />
          <p className="text-xl text-gray-300 max-w-xl mx-auto">The ink speaks for itself.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {STYLES.map((style) => (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-widest border transition-all duration-300 ${
                activeStyle === style
                  ? "border-primary text-black bg-primary"
                  : "border-zinc-800 text-gray-400 hover:border-primary hover:text-white"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {portfolio?.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="aspect-[4/5] bg-card border border-zinc-900 relative group overflow-hidden"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.style}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-primary text-xs font-bold tracking-widest uppercase mb-1">{item.style}</p>
                      <p className="text-white text-sm">{item.sizeCategory}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
