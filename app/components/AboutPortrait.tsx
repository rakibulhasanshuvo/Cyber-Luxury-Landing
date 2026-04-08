"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function AboutPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative group"
    >
      {/* Animated Glow Border */}
      <div className="absolute -inset-1 bg-linear-to-tr from-accent-1 via-accent-2 to-accent-3 rounded-[2.5rem] blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />

      <div className="relative rounded-[2.5rem] overflow-hidden glass-card border-white/10 group-hover:border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] aspect-[4/5] bg-bg-card z-0">
        <Image
          src="/images/portrait.png"
          alt="Portrait"
          fill
          className="object-cover group-hover:brightness-110 transition-all duration-1000 scale-105 group-hover:scale-100"
          sizes="(max-width: 768px) 100vw, 45vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/5 to-transparent pointer-events-none opacity-40 z-10" />

        {/* Profile Bio Card */}
        <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hidden sm:block">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-accent-1 to-accent-3 flex items-center justify-center p-0.5">
              <div className="w-full h-full rounded-[0.9rem] bg-bg-card flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-accent-1" />
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-xl tracking-tight">Expert Designer</div>
              <div className="text-accent-2 text-sm font-bold uppercase tracking-widest mt-1">Founding Member</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Grid SVG */}
      <div className="absolute -top-12 -left-12 w-48 h-48 text-accent-1/10 pointer-events-none">
        <svg width="100%" height="100%" fill="none"><defs><pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="currentColor"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots)"/></svg>
      </div>
    </motion.div>
  );
}
