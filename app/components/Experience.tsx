"use client";

import { motion } from "framer-motion";
import { Calendar, Briefcase, MapPin, Award, Figma, Cpu, Box, Terminal  } from "lucide-react";
import { cn } from "@/lib/utils";

type ExperienceTag =
  | "Product Strategy"
  | "Design Systems"
  | "Team Lead"
  | "UX Engineering"
  | "Data Viz"
  | "Animation"
  | "Visual Design"
  | "Branding"
  | "Campaigns";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  desc: string;
  tags: ExperienceTag[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Aether Systems",
    role: "Senior Product Designer",
    period: "2022 — Present",
    location: "San Francisco, CA",
    desc: "Leading the design system team for a next-gen FinTech platform. Reduced design-to-dev friction by 40% through atomic tokenization.",
    tags: ["Product Strategy", "Design Systems", "Team Lead"],
  },
  {
    company: "Quantum Flow",
    role: "UX Engineer",
    period: "2019 — 2022",
    location: "Remote / London",
    desc: "Developed high-fidelity prototypes for complex data visualization dashboards using React and D3.js. Orchestrated 12+ product launches.",
    tags: ["UX Engineering", "Data Viz", "Animation"],
  },
  {
    company: "Nebula Creative",
    role: "UI Designer",
    period: "2017 — 2019",
    location: "New York, NY",
    desc: "Crafted immersive digital experiences for luxury brands. Focused on high-conversion landing pages and interactive storytelling.",
    tags: ["Visual Design", "Branding", "Campaigns"],
  },
];

const techStack = [
  { name: "Figma", icon: Figma, color: "text-[#F24E1E]" },
  { name: "React", icon: Cpu, color: "text-[#61DAFB]" },
  { name: "Framer", icon: Box, color: "text-[#0055FF]" },
  { name: "Tailwind", icon: Terminal, color: "text-[#38B2AC]" },
];

export default function Experience() {
  return (
    <section id="experience" className="py-48 relative bg-bg-secondary/40 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-radial-to-b from-accent-1/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-[-10%] w-[600px] h-[600px] bg-accent-2/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row gap-24">
          
          {/* Left Column: Header & Tech Stack */}
          <div className="w-full lg:w-[40%]">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <div className="p-2 rounded-lg bg-accent-1/10 border border-accent-1/20">
                  <Briefcase className="w-5 h-5 text-accent-1" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-accent-1">
                  Career Journey
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-white mb-8"
              >
                Building <span className="gradient-text">Impact</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-text-secondary font-medium leading-relaxed mb-12"
              >
                Over a decade of solving complex problems through elegant design 
                and robust engineering.
              </motion.p>

              {/* Tech Stack Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {techStack.map((tech, i) => (
                  <div 
                    key={i} 
                    className="group p-6 rounded-2xl glass-card border-white/5 hover:border-accent-1/30 transition-all duration-500"
                  >
                    <tech.icon className={cn("w-8 h-8 mb-4 transition-transform group-hover:scale-110", tech.color)} />
                    <span className="text-sm font-bold tracking-widest text-text-muted group-hover:text-white transition-colors uppercase">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-12 p-8 rounded-[2rem] bg-linear-to-br from-accent-1/20 to-accent-3/20 border border-accent-1/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-accent-1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shadow-xl backdrop-blur-md">
                    <Award className="w-7 h-7 text-accent-2" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Recognition</h4>
                    <p className="text-sm text-text-muted font-medium">Awwwards & FWA Portfolio Award</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Experience Timeline */}
          <div className="w-full lg:w-[60%] flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.1 }}
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
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
