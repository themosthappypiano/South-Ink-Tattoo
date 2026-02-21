import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  timeAgo: string;
  text: string;
  services?: string[];
  image?: string;
}

const reviews: Review[] = [
  {
    name: "Stephen Mawhinney",
    rating: 5,
    timeAgo: "a year ago",
    text: "Have had a number of tattoos done over the years, but none compare to large chest piece I had done recently by Atom who is the owner of the business. The attention to detail is absolutely incredible. Best piece I have ever done.",
    services: ["Tattoos"]
  },
  {
    name: "N R",
    rating: 5,
    timeAgo: "10 months ago",
    text: "Atom is a genuine, humble artist who cares deeply about his craft. His attention to detail and hygiene is incredible and he takes so much time explaining every step. He is a real gent and an incredible artist. Highly recommended! Thanks Atom 💪",
    services: ["Tattoos"]
  },
  {
    name: "Jasmine Moran",
    rating: 5,
    timeAgo: "10 months ago",
    text: "I went to Atom for my first tattoo and I would highly recommend. He is very chatty and was very reassuring as it was my first tattoo. I showed him a photo that I liked and he elevated it entirely to another level and I love it so much.",
    services: ["Tattoos"],
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=300&fit=crop"
  },
  {
    name: "Margaret T Lyons",
    rating: 5,
    timeAgo: "4 months ago",
    text: "Atom very professional and caring. Each client treated individually to their needs. Honest and helpful.",
    services: ["Tattoos"]
  },
  {
    name: "Dankel Berry",
    rating: 5,
    timeAgo: "a year ago",
    text: "Atom gave my friend, girlfriend, and myself some amazing tattoos as reminders of our trip to Ireland! Without a doubt, it was one of the best tattoo experiences I've had to date (I have 20 tattoos). Definitely recommend it to anybody ☺️",
    services: ["Tattoos", "Tattoo design"]
  },
  {
    name: "Susan Hilliard",
    rating: 5,
    timeAgo: "4 years ago",
    text: "Love love love my new tattoo 😍 would not go anywhere else Atom is so personal there is nothing he doesn't know about tattooing and what a artist, very nice guy makes the experience very comfortable, made my ideal into a work for art",
    services: ["Tattoos"],
    image: "https://images.unsplash.com/photo-1590246814883-57c511e88346?w=400&h=300&fit=crop"
  },
  {
    name: "Lumi Fahey",
    rating: 5,
    timeAgo: "a year ago",
    text: "I have been going to Atom for years. I couldn't recommend enough. Light hand, amazing products, great aftercare. tattoos don't fade and he also does great covers. very fast and great charges.",
    services: ["Tattoos", "Line tattoo and cover ups"]
  },
  {
    name: "D Mooney",
    rating: 5,
    timeAgo: "3 months ago",
    text: "Atom is amazing to deal with, and an exceptional artist. Spotless studio, and excellent aftercare service",
    services: ["Tattoo cover-ups", "Fine line tattoos", "Tattoo design"]
  }
];

export function GoogleReviews() {
  return (
    <section className="py-20 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A227' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5
      }} />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent to-primary/50 flex-1 max-w-24" />
            <Quote className="w-8 h-8 text-primary" />
            <div className="h-px bg-gradient-to-l from-transparent to-primary/50 flex-1 max-w-24" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 uppercase tracking-tight">
            What Our Clients Say
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary drop-shadow-lg" />
            ))}
            <span className="ml-3 text-2xl font-bold text-white">4.9</span>
            <span className="text-primary font-semibold">★★★★★</span>
          </div>
          <p className="text-gray-400 font-medium">Verified Google Reviews</p>
        </motion.div>

        {/* Single Row Scrollable Reviews */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {[...reviews, ...reviews].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[320px] md:min-w-[380px] bg-white/5 backdrop-blur-sm border border-primary/20 p-6 relative group hover:border-primary/50 transition-all duration-300 snap-start rounded-lg hover:bg-white/10"
              >
                {/* Accent Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  <span className="ml-2 text-xs text-gray-400 font-semibold">{review.timeAgo}</span>
                </div>

                {/* Review Text */}
                <p className="text-gray-200 text-sm leading-relaxed mb-4 line-clamp-3">
                  "{review.text}"
                </p>

                {/* Tattoo Image */}
                {review.image && (
                  <div className="mb-4 rounded-lg overflow-hidden border border-primary/30">
                    <img 
                      src={review.image} 
                      alt={`Tattoo work for ${review.name}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                )}

                {/* Services */}
                {review.services && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {review.services.slice(0, 2).map((service, j) => (
                      <span key={j} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/30 font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                )}

                {/* Reviewer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-xs">{review.name.charAt(0)}</span>
                    </div>
                    <span className="font-semibold text-white text-sm">{review.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Indicators */}
          <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-zinc-800 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-zinc-800 to-transparent pointer-events-none" />
        </div>

        {/* Google Reviews Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a 
            href="https://www.google.com/maps/place/South+Ink+Tattoo/@53.3225123,-6.2675323,17z/data=!4m8!3m7!1s0x48670c02c0c660ad:0x8ad5c5fb15ad2a76!8m2!3d53.3225123!4d-6.2649574!9m1!1b1!16s%2Fg%2F11bxc6lb_z?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-primary hover:text-white transition-all duration-300 font-bold tracking-widest uppercase bg-primary/10 hover:bg-primary/20 px-6 py-3 rounded border border-primary/30 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(201,162,39,0.2)]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            View All Reviews on Google
            <Star className="w-4 h-4 fill-current" />
          </a>
        </motion.div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}