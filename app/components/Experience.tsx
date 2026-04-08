"use client";

import { motion } from "framer-motion";
import { Briefcase, Award } from "lucide-react";

import { experiences, techStack } from "./Experience.data";
import ExperienceItem from "./ExperienceItem";
import TechStackItem from "./TechStackItem";

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
                  <TechStackItem key={i} tech={tech} />
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
              <ExperienceItem key={i} exp={exp} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
