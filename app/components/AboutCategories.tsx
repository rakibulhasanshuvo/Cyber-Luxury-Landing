"use client";

import { motion } from "framer-motion";
import { Target, ArrowRight } from "lucide-react";
import { categories } from "./About.data";

export default function AboutCategories() {
  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-3"
      >
        <div className="p-2 rounded-lg bg-accent-1/10 border border-accent-1/20">
          <Target className="w-5 h-5 text-accent-2" />
        </div>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-accent-1">
          The Philosophy
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-white leading-tight mb-8">
          Design with <span className="gradient-text">Purpose.</span>
        </h2>
        <p className="text-2xl text-accent-3 font-bold mb-8 leading-snug">
          Bridging the gap between human intuition and technical excellence.
        </p>
        <p className="text-xl text-text-secondary leading-relaxed font-medium mb-12">
          I specialize in crafting immersive digital experiences that leverage
          data-driven insights and forward-thinking aesthetics. Every project
          is an opportunity to push the boundaries of what&apos;s possible on the web.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="p-6 rounded-2xl glass-card border-white/5 hover:border-accent-1/30 group transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-3">
              <cat.icon className="w-6 h-6 text-accent-1 transition-transform group-hover:scale-110" />
              <h4 className="text-lg font-bold text-white group-hover:text-accent-2 transition-colors">
                {cat.name}
              </h4>
            </div>
            <p className="text-sm text-text-muted font-medium leading-relaxed">
              {cat.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-4 inline-flex items-center gap-3 text-white font-bold tracking-widest uppercase text-xs group hover:text-accent-1 transition-colors"
      >
        Learn more about my process
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
}
