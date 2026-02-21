import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { GoogleReviews } from "@/components/GoogleReviews";
import { ArrowRight, Star } from "lucide-react";
import heroVideo from "@assets/Project_name_202602211009_2nrxs_(online-video-cutter.com)_1771667387355.mp4";
import work1 from "@assets/ChatGPT_Image_Feb_21,_2026,_09_03_25_AM_1771666889679.png";
import work2 from "@assets/ChatGPT_Image_Feb_21,_2026,_09_05_44_AM_1771666891032.png";
import work3 from "@assets/ChatGPT_Image_Feb_21,_2026,_09_08_59_AM_1771666892287.png";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/LdM78V6f/Chat-GPT-Image-Feb-21-2026-11-33-56-AM.png" 
            alt="Tattoo Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <div className="text-left">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-white mb-6 tracking-tighter uppercase leading-[0.85]"
              >
                RATHMINES<br />
                <span className="text-primary">FINEST</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-foreground/90 font-medium tracking-tight mb-10 max-w-xl"
              >
                Custom Ink. Raw Talent. Permanent Legacy. With 30 years of experience, Rathmines' finest tattoo experience.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Link href="/book">
                  <Button className="h-16 px-12 text-xl bg-primary text-black hover:bg-white hover:text-black font-bold uppercase tracking-widest rounded-none border-2 border-primary skew-x-[-10deg] transition-all duration-300">
                    <span className="skew-x-[10deg]">Get Inked</span>
                  </Button>
                </Link>
                <Link href="/artists">
                  <Button variant="outline" className="h-16 px-12 text-xl text-primary border-primary hover:bg-primary hover:text-black font-bold uppercase tracking-widest rounded-none bg-transparent skew-x-[-10deg] transition-all duration-300">
                    <span className="skew-x-[10deg]">Meet Artist</span>
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Video Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative aspect-video lg:aspect-square w-full max-w-2xl mx-auto lg:ml-auto overflow-hidden border-2 border-primary/30"
            >
              <div className="absolute inset-0 border-[12px] border-black/20 z-10 pointer-events-none" />
              <video 
                src={heroVideo}
                autoPlay 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <GoogleReviews />

      {/* INTRO SECTION */}
      <section className="py-24 bg-black grainy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader 
                title="This Is Ink." 
                subtitle="No trends. No flash-sheet copy work. No watered-down art."
              />
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                South Ink Tattoo is built for clients who want work that lasts longer than hype. Every piece is custom. Every line intentional. We respect the craft, the history, and the skin.
              </p>
              <Link href="/book">
                <Button className="text-primary hover:text-white p-0 h-auto font-bold tracking-widest uppercase bg-transparent hover:bg-transparent group">
                  Book Your Session <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-primary/30 z-0 translate-x-4 translate-y-4" />
              <img 
                src={work1} 
                alt="Studio Interior" 
                className="w-full hover:grayscale transition-all duration-700 relative z-10 border border-zinc-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <SectionHeader title="Featured Work" className="mb-0" />
            <Link href="/gallery">
              <Button variant="ghost" className="text-primary hidden md:flex hover:text-white hover:bg-transparent">
                VIEW ALL WORK
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: work1, alt: "Traditional Tattoo Work" },
              { src: work2, alt: "Custom Design" },
              { src: work3, alt: "Artistic Piece" }
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative aspect-square overflow-hidden"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/gallery">
              <Button className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-black uppercase tracking-widest font-bold">
                Enter The Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container mx-auto px-4 relative z-10 text-center border-y border-primary/30 py-20">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 uppercase tracking-tight">
            Ready to wear it for life?
          </h2>
          <Link href="/book">
            <Button className="bg-primary text-black h-16 px-12 text-xl font-bold uppercase tracking-widest rounded-none shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_40px_rgba(201,162,39,0.5)] hover:scale-105 transition-all duration-300">
              Book Your Session
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
