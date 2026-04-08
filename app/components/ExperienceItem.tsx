import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { ExperienceItem as ExperienceItemType } from "./Experience.data";

interface ExperienceItemProps {
  exp: ExperienceItemType;
  index: number;
}

export default function ExperienceItem({ exp, index }: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.1 }}
      className="group relative p-10 rounded-[2.5rem] glass-card border-white/5 hover:border-accent-1/40 hover:translate-y-[-4px] transition-all duration-700"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h3 className="font-display text-3xl font-bold text-white group-hover:gradient-text transition-all duration-500">
            {exp.role}
          </h3>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xl font-bold text-accent-1">{exp.company}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-border-glass" />
            <div className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-widest font-bold">
              <Calendar className="w-4 h-4 text-accent-1/60" />
              {exp.period}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-text-muted uppercase tracking-wider backdrop-blur-md">
          <MapPin className="w-4 h-4 text-accent-3/70" />
          {exp.location}
        </div>
      </div>

      <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl font-medium">
        {exp.desc}
      </p>

      <div className="flex flex-wrap gap-3">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-text-muted uppercase tracking-widest group-hover:border-white/10 transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
