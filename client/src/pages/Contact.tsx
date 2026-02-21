import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-4">
        <SectionHeader title="Contact Us" center className="mb-20" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-display text-white mb-6">Studio Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary w-6 h-6 mt-1" />
                  <div>
                    <p className="text-white font-bold uppercase tracking-wide">Location</p>
                    <p className="text-gray-400">38 Castlewood Ave, Rathmines, Dublin 6, D06 E2P3, Ireland</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-primary w-6 h-6 mt-1" />
                  <div>
                    <p className="text-white font-bold uppercase tracking-wide">Email</p>
                    <p className="text-gray-400">info@southinkdublin.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-primary w-6 h-6 mt-1" />
                  <div>
                    <p className="text-white font-bold uppercase tracking-wide">Phone</p>
                    <p className="text-gray-400">+353 87 212 7130</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-primary w-6 h-6 mt-1" />
                  <div>
                    <p className="text-white font-bold uppercase tracking-wide">Hours</p>
                    <p className="text-gray-400">Tue - Sat: 11am - 8pm</p>
                    <p className="text-gray-400">Sun - Mon: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-zinc-800 p-8 text-center bg-card">
              <h3 className="text-xl font-display text-white mb-4">Questions?</h3>
              <p className="text-gray-400 mb-6">
                Check our FAQ or just come in for a consultation. We prefer ink over emails.
              </p>
              <Link href="/book">
                <Button className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-black uppercase tracking-widest font-bold">
                  Book Instead
                </Button>
              </Link>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] md:h-full min-h-[400px] border border-zinc-800 bg-zinc-900 relative">
             {/* Mock Map */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2383.298847777!2d-6.2769842!3d53.3244024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9c4d7b1f65%3A0x5c9c4d7b1f651c9c!2s38%20Castlewood%20Ave%2C%20Rathmines%2C%20Dublin%206%2C%20Ireland!5e0!3m2!1sen!2sus!4v1645564859516!5m2!1sen!2sus" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy"
               className="opacity-90"
             ></iframe>
             <div className="absolute inset-0 pointer-events-none border-2 border-primary/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
