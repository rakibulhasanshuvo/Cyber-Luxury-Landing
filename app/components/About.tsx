"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, Search, Layout, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function About() {
  const categories = [
    { 
      name: "Product Strategy", 
      icon: Target,
      desc: "Defining the core value and market fit for digital products."
    },
    { 
      name: "Visual Identity", 
      icon: Sparkles,
      desc: "Crafting iconic brands that resonate across all touchpoints."
    },
    { 
      name: "Design Systems", 
      icon: Layout,
      desc: "Building scalable frameworks that bridge design and code."
    },
    { 
      name: "User Research", 
      icon: Search,
      desc: "Uncovering deep insights through rigorous user testing."
    },
  ];

  return (
    <section id="about" className="py-48 relative overflow-hidden bg-bg-primary">
      {/* Decorative background orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-1/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent-3/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">
          
          {/* Left Column: Image/Portrait */}
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
                unoptimized={true}
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

          {/* Right Column: Content */}
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
                is an opportunity to push the boundaries of what's possible on the web.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categories.map((cat, i) => (
                <motion.div 
                  key={i}
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

        </div>
      </div>
    </section>
  );
}
