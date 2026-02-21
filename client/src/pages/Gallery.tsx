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
        <div className="text-center">
          <SectionHeader title="Gallery" center className="mb-8" />
          <div className="flex justify-center items-center py-32">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary mb-6">Until Further Notice</h3>
              <p className="text-gray-400 text-lg">Gallery content coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
