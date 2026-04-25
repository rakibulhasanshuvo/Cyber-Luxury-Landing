"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { useRef, MouseEvent } from "react";
import Image from "next/image";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type PortfolioTag =
  | "React"
  | "Next.js"
  | "TypeScript"
  | "Python"
  | "React Native"
  | "GraphQL"
  | "Shopify API";

interface Project {
  title: string;
  tags: PortfolioTag[];
  desc: string;
  image: string;
  link?: string;
  github?: string;
  className?: string; // For bento grid spanning
}

const projects: Project[] = [
  {
    title: "Deep Learning Platform",
    tags: ["React", "Next.js", "TypeScript", "Python"],
    desc: "A comprehensive suite of tools for data scientists and ML engineers to build and deploy models at scale with real-time telemetry.",
    image: "/images/deep-learning.png",
    className: "col-span-1 lg:col-span-2 row-span-2",
  },
  {
    title: "Mobile Finance App",
    tags: ["React Native", "TypeScript", "GraphQL"],
    desc: "A cross-platform mobile application designed to simplify personal finance with automated budgeting and predictive spending insights.",
    image: "/images/finance-app.png",
    className: "col-span-1 lg:col-span-1 row-span-1",
  },
  {
    title: "E-commerce Storefront",
    tags: ["Next.js", "TypeScript", "Shopify API"],
    desc: "A high-performance headless commerce engine with server-side rendering, dynamic inventory, and a lightning-fast checkout flow.",
    image: "/images/ecommerce.png",
    className: "col-span-1 lg:col-span-1 row-span-1",
  },
];

function BentoCard({ project, index }: { project: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yShift = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -20% 0px" }}
      transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] glass-card",
        project.className
      )}
    >
      {/* Spotlight Effect Border */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(102, 16, 242, 0.3),
              transparent 40%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 40%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent 40%
            )
          `,
        }}
      >
        <div className="absolute inset-0 rounded-[2rem] border border-white/[0.15]" />
      </motion.div>

      {/* Project Image Container */}
      <div className="relative w-full h-64 lg:h-80 overflow-hidden border-b border-white/[0.05]">
        <motion.div 
          style={{ y: yShift }}
          className="absolute inset-[-10%] w-[120%] h-[120%] z-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity z-10" />
        <div className="absolute inset-0 bg-accent-1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
      </div>

      {/* Project Info */}
      <div className="relative z-30 flex flex-col flex-1 p-8 lg:p-10">
        <div className="space-y-4 flex-1">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-accent-2 uppercase tracking-widest group-hover:border-accent-1/30 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="font-display text-3xl font-bold tracking-tight text-white group-hover:text-accent-3 transition-colors duration-500">
            {project.title}
          </h3>
          
          <p className="text-base text-text-secondary leading-relaxed font-medium">
            {project.desc}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/[0.05]">
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-white/10 hover:border-accent-1/30 hover:scale-105 transition-all"
              aria-label="Codebase"
            >
              <Github className="w-5 h-5 text-accent-1" />
            </a>
          )}
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-linear-to-br from-accent-1/20 to-accent-3/20 border border-accent-1/30 text-white hover:from-accent-1/30 hover:to-accent-3/30 hover:border-accent-1/50 hover:scale-105 transition-all"
              aria-label="Live Preview"
            >
              <ExternalLink className="w-5 h-5 text-accent-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="work" className="py-48 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-accent-1/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[#00FFFF]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="p-2 rounded-lg bg-accent-1/10 border border-accent-1/20">
              <Sparkles className="w-5 h-5 text-accent-2" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-accent-1">
              Creative Portfolio
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-white mb-10"
          >
            Featured <span className="gradient-text">Experiences</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-xl text-text-secondary font-medium leading-relaxed"
          >
            A collection of digital products built at the intersection of 
            design excellence and technical performance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
          {projects.map((project, i) => (
            <BentoCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
