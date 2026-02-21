import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, center = false, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""} ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white mb-4 tracking-tight leading-none uppercase"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`h-1 w-24 bg-primary mb-6 ${center ? "mx-auto" : ""}`}
        />
      )}
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-foreground/80 font-body text-lg md:text-xl font-light max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
