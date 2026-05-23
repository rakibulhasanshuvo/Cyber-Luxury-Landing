"use client";

import { motion, useSpring, animate, Variants } from "framer-motion";
import { ArrowRight, Download, Star } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { validateSafeUrl } from "@/lib/utils";

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
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const count = useSpring(0, { bounce: 0, duration: 1500 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, target, count]);

  useEffect(() => {
    return count.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
  }, [count, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

export default function Hero() {





  const cvUrl = validateSafeUrl(process.env.NEXT_PUBLIC_CV_URL);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-[#03030A]">
      {/* Background elements - Deeply Blurred Fluid Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Core glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,rgba(102,16,242,0.15)_0%,rgba(3,3,10,0)_60%)] blur-[120px]" />

        {/* Floating color orbs acting as fluid mesh */}
        <motion.div
          animate={{
            x: ["0%", "5%", "-5%", "0%"],
            y: ["0%", "-5%", "5%", "0%"],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#6610F2]/20 blur-[150px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ["0%", "-8%", "8%", "0%"],
            y: ["0%", "8%", "-8%", "0%"],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#00FFFF]/10 blur-[150px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ["0%", "10%", "-10%", "0%"],
            y: ["0%", "5%", "-5%", "0%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] bg-[#A78BFA]/10 blur-[120px] rounded-full mix-blend-screen"
        />

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
          <div className="px-6 py-2 rounded-full glass-card border-accent-1/20 text-[10px] sm:text-xs font-bold text-accent-2 tracking-[0.2em] uppercase flex items-center gap-3 glow-border">
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
          <motion.a
            href="#work"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="w-full sm:w-auto px-12 py-5 bg-linear-to-br from-accent-1 to-accent-3 bg-[length:200%_auto] hover:bg-right text-white font-bold rounded-2xl shadow-2xl hover:shadow-accent-1/40 transition-all duration-500 flex items-center justify-center gap-3 group/cta relative overflow-hidden"
          >
            <span className="relative z-10">Start a project</span>
            <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1.5 transition-transform relative z-10" />
          </motion.a>
          {cvUrl && (
            <motion.a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-full sm:w-auto px-12 py-5 glass-card text-white font-bold rounded-2xl flex items-center justify-center gap-3 group/resume hover:border-accent-1/40 transition-all duration-300"
            >
              Download CV <Download className="w-5 h-5 text-accent-3 group-hover:translate-y-0.5 transition-transform" />
            </motion.a>
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
