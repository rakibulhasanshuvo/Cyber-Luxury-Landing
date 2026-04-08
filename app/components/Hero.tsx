"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Star } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const stats = [
  { label: "Projects Done", target: 120, suffix: "+" },
  { label: "Years Exp", target: 10, suffix: "+" },
  { label: "Global Awards", target: 45, suffix: "" },
  { label: "Happy Clients", target: 99, suffix: "%" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

import { Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const countTimer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(countTimer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(countTimer);
  }, [isInView, target]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 200]);
  const y2 = useTransform(scrollY, [0, 800], [0, 150]);
  const y3 = useTransform(scrollY, [0, 800], [0, 100]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Background elements - Enhanced Depth */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-[-25%] left-[-15%] w-[1000px] h-[1000px] bg-radial-to-br from-accent-1/20 via-accent-2/10 to-transparent blur-[140px] aurora-animate opacity-60" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[800px] h-[800px] bg-radial-to-bl from-accent-3/20 via-accent-4/10 to-transparent blur-[140px] aurora-animate opacity-60" style={{ animationDelay: "-7s" }} />

        <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[70%] w-[500px] h-[500px] bg-accent-1/10 blur-[100px] rounded-full orb-animate-1" />
        <motion.div style={{ y: y2 }} className="absolute top-[50%] left-[10%] w-[400px] h-[400px] bg-accent-3/10 blur-[100px] rounded-full orb-animate-2" />
        <motion.div style={{ y: y3 }} className="absolute top-[5%] left-[30%] w-[300px] h-[300px] bg-accent-2/10 blur-[100px] rounded-full orb-animate-3" />

        {/* Dynamic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.02)_1.5px,transparent_1.5px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />
      </div>

      <motion.div 
        className="container mx-auto px-6 text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 mb-10"
        >
          <div className="px-6 py-2 rounded-full bg-accent-1/10 border border-accent-1/20 text-[10px] sm:text-xs font-bold text-accent-2 tracking-[0.2em] uppercase flex items-center gap-3 shadow-[0_0_20px_rgba(108,92,231,0.15)] glow-border">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.9)] pulse-animate" />
            Available for high-stakes projects
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl sm:text-7xl md:text-9xl font-bold tracking-tight leading-[0.95] mb-10 text-white"
        >
          Crafting <span className="gradient-text drop-shadow-[0_0_30px_rgba(108,92,231,0.3)]">digital worlds</span><br className="hidden sm:block" /> at scale.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed mb-14 font-medium"
        >
          Global-standard product design for SaaS & FinTech. Transforming 
          complex requirements into <span className="text-white">seamless experiences</span>.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32"
        >
          <a
            href="#work"
            className="w-full sm:w-auto px-12 py-5 bg-linear-to-br from-accent-1 to-accent-4 text-white font-bold rounded-2xl shadow-2xl hover:shadow-accent-1/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group/cta relative overflow-hidden"
          >
            <span className="relative z-10">Explore Work</span>
            <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1.5 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </a>
          {process.env.NEXT_PUBLIC_CV_URL && (
            <a
              href={process.env.NEXT_PUBLIC_CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl backdrop-blur-xl hover:bg-white/10 hover:border-accent-1/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group/resume"
            >
              Download CV <Download className="w-5 h-5 text-accent-3 group-hover:translate-y-0.5 transition-transform" />
            </a>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 sm:p-10 glass-card group relative overflow-hidden h-full flex flex-col items-center justify-center text-center"
            >
              <div className="absolute top-4 right-4 text-accent-1/20 group-hover:text-accent-1/40 transition-colors">
                <Star className="w-5 h-5 fill-current" />
              </div>
              
              <div className="font-display text-4xl sm:text-5xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform">
                <Counter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-text-muted mt-2 group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
