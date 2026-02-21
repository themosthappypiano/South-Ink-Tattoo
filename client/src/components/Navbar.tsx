import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoImg from "@assets/ChatGPT_Image_Feb_21,_2026,_09_49_31_AM_1771666886055.png";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Artists", href: "/artists" },
    { name: "Gallery", href: "/gallery" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Separate Logo */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <div className="flex cursor-pointer group">
            <img 
              src={logoImg} 
              alt="Slanging Ink" 
              className="h-24 w-24 md:h-32 md:w-32 object-contain filter group-hover:brightness-125 transition-all" 
            />
          </div>
        </Link>
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-black/95 border-primary/20 py-2 shadow-lg backdrop-blur-sm"
            : "bg-black/80 border-primary/20 py-3 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-end items-center">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span 
                  className={`text-sm tracking-widest uppercase font-semibold cursor-pointer hover:text-primary transition-colors ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
            <Link href="/book">
              <Button 
                variant="default" 
                className="bg-primary text-black hover:bg-primary/90 font-bold tracking-wider px-6 rounded-none skew-x-[-10deg]"
              >
                <span className="skew-x-[10deg]">BOOK NOW</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-foreground hover:text-primary p-2"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-foreground hover:text-primary p-2"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-display text-2xl uppercase tracking-widest cursor-pointer hover:text-primary transition-colors ${
                      location === link.href ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
              <Link href="/book">
                <span onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="bg-primary text-black hover:bg-white hover:text-black mt-4 text-xl py-6 px-12 font-bold rounded-none w-full">
                    BOOK A SESSION
                  </Button>
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black/80 backdrop-blur-md p-4 border-t border-primary/20">
        <Link href="/book">
          <Button className="w-full bg-primary text-black font-bold uppercase tracking-widest rounded-none shadow-[0_0_15px_rgba(201,162,39,0.3)]">
            Book Your Session
          </Button>
        </Link>
      </div>
    </>
  );
}
