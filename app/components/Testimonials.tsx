"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { testimonials } from "./Testimonials.data";

const REPEAT_COUNT = 4;
const MARQUEE_TESTIMONIALS = Array(REPEAT_COUNT).fill(testimonials).flat();

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-1/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 mb-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 mb-6"
          >
            <div className="w-8 h-px bg-linear-to-r from-accent-2 to-accent-3" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-accent-1">
              Infinite Proof
            </span>
            <div className="w-8 h-px bg-linear-to-l from-accent-2 to-accent-3" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8"
          >
            What Clients Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-lg text-text-secondary font-medium leading-relaxed"
          >
            Hear from the people I&apos;ve had the privilege of working with.
          </motion.p>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 px-4 w-max hover:[animation-play-state:paused]"
        >
          {MARQUEE_TESTIMONIALS.map((testimonial, i) => (
            <div
              key={i}
              className="w-[400px] sm:w-[450px] flex-shrink-0 p-10 glass-card group hover:border-accent-1/40 hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <div className="flex gap-1.5">
                  {Array.from({ length: testimonial.stars }, (_, j) => (
                    <Star key={j} className="w-4.5 h-4.5 fill-yellow-400 text-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]" />
                  ))}
                </div>
                
                <p className="text-lg font-medium text-text-secondary leading-relaxed italic relative">
                  <span className="text-5xl font-display text-accent-2 opacity-10 absolute -top-8 -left-6">&quot;</span>
                  {testimonial.feedback}
                </p>
              </div>

              <div className="mt-12 flex items-center gap-5 border-t border-white/[0.05] pt-8 group-hover:border-accent-1/20 transition-colors">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <div className="absolute inset-0 bg-accent-1 blur-md rounded-full scale-0 group-hover:scale-110 transition-transform opacity-30" />
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="56px"
                    className="rounded-full border border-white/10 transition-all duration-300 relative group-hover:border-accent-2 z-10 object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-white font-bold text-lg truncate">{testimonial.name}</div>
                  <div className="text-sm font-medium text-text-muted truncate">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradients for fading edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#03030A] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#03030A] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
