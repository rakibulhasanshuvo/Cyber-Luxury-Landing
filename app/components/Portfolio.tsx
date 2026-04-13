"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  tags: string[];
  desc: string;
  image: string;
  link: string;
  github: string;
  drift: number;
  reverse?: boolean;
}

const projects: Project[] = [
  {
    title: "Deep Learning Platform",
    tags: ["React", "Next.js", "TypeScript", "Python"],
    desc: "A comprehensive suite of tools for data scientists and ML engineers to build and deploy models at scale with real-time telemetry.",
    image: "/images/deep-learning.png",
    link: "#",
    github: "#",
    drift: 0.03,
  },
  {
    title: "Mobile Finance App",
    tags: ["React Native", "TypeScript", "GraphQL"],
    desc: "A cross-platform mobile application designed to simplify personal finance with automated budgeting and predictive spending insights.",
    image: "/images/finance-app.png",
    link: "#",
    github: "#",
    drift: -0.025,
    reverse: true,
  },
  {
    title: "E-commerce Storefront",
    tags: ["Next.js", "TypeScript", "Shopify API"],
    desc: "A high-performance headless commerce engine with server-side rendering, dynamic inventory, and a lightning-fast checkout flow.",
    image: "/images/ecommerce.png",
    link: "#",
    github: "#",
    drift: 0.02,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xShift = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yShift = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -20% 0px" }}
      transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.1 }}
      className={cn(
        "group relative flex flex-col md:flex-row items-center gap-12 md:gap-24",
        project.reverse && "md:flex-row-reverse"
      )}
    >
      {/* Project Image Container */}
      <div className="w-full md:w-[60%] relative overflow-hidden rounded-[2rem] bg-bg-card border border-border-subtle group-hover:border-accent-1/40 transition-all duration-1000 aspect-[16/10] shadow-2xl z-0">
        <motion.div 
          style={{ x: project.drift > 0 ? xShift : -xShift, y: yShift }} 
          className="absolute inset-[-10%] w-[120%] h-[120%] z-0"
        >
          {/* ⚡ Bolt: Removed unoptimized={true} to allow Next.js automatic image optimization (WebP/AVIF generation and proper sizing) */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </motion.div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/5 to-transparent opacity-40 group-hover:opacity-20 transition-opacity z-10" />
        <div className="absolute inset-0 bg-accent-1/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
      </div>

      {/* Project Info */}
      <div className="w-full md:w-[40%] flex flex-col gap-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-accent-1/5 border border-accent-1/10 text-[10px] font-bold text-accent-1 uppercase tracking-widest group-hover:border-accent-1/30 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white group-hover:gradient-text transition-all duration-500">
            {project.title}
          </h3>
          
          <p className="text-xl text-text-secondary leading-relaxed font-medium">
            {project.desc}
          </p>
        </div>

        <div className="flex items-center gap-5 mt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 text-white text-sm font-bold flex items-center gap-3 hover:bg-white/10 hover:border-accent-1/30 hover:scale-105 transition-all"
          >
            <Github className="w-5 h-5 text-accent-1" />
            Codebase
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-linear-to-br from-accent-1/20 to-accent-3/20 border border-accent-1/30 text-white text-sm font-bold flex items-center gap-3 hover:from-accent-1/30 hover:to-accent-3/30 hover:border-accent-1/50 hover:scale-105 transition-all"
          >
            <ExternalLink className="w-5 h-5 text-accent-3" />
            Live Preview
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="work" className="py-48 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-accent-1/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-accent-3/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-32">
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

        <div className="flex flex-col gap-48">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
