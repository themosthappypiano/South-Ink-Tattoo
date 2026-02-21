import { Link } from "wouter";
import logoImg from "@assets/ChatGPT_Image_Feb_21,_2026,_09_49_31_AM_1771666886055.png";

export function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-24 md:pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoImg} alt="SIN Logo" className="w-10 h-10 object-contain grayscale" />
              <span className="font-display text-2xl font-bold tracking-widest">SOUTH INK TATTOO</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6 font-light">
              Custom ink that hits different. No trends. No flash-sheet copy work. Built bold for clients who want work that lasts.
            </p>
          </div>

          <div>
            <h4 className="text-primary mb-6 text-sm tracking-widest">Navigation</h4>
            <div className="flex flex-col gap-3">
              <Link href="/artists"><span className="text-muted-foreground hover:text-white cursor-pointer transition-colors text-sm uppercase tracking-wide">Artists</span></Link>
              <Link href="/gallery"><span className="text-muted-foreground hover:text-white cursor-pointer transition-colors text-sm uppercase tracking-wide">Gallery</span></Link>
              <Link href="/services"><span className="text-muted-foreground hover:text-white cursor-pointer transition-colors text-sm uppercase tracking-wide">Services</span></Link>
              <Link href="/book"><span className="text-muted-foreground hover:text-white cursor-pointer transition-colors text-sm uppercase tracking-wide">Book Now</span></Link>
            </div>
          </div>

          <div>
            <h4 className="text-primary mb-6 text-sm tracking-widest">Studio</h4>
            <div className="flex flex-col gap-3 text-muted-foreground text-sm">
              <p>38 Castlewood Ave</p>
              <p>Rathmines, Dublin 6</p>
              <p>D06 E2P3, Ireland</p>
              <p className="mt-4">Tue - Fri: 11am - 6pm</p>
              <p>Saturday: 11am - 6pm</p>
              <p>Sun - Mon: Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground tracking-wider uppercase">
          <p>&copy; {new Date().getFullYear()} South Ink Tattoo Dublin. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/southinkdublin" target="_blank" rel="noopener noreferrer" className="hover:text-primary cursor-pointer transition-colors">Facebook</a>
            <a href="mailto:southinktattoo@yahoo.com" className="hover:text-primary cursor-pointer transition-colors">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
