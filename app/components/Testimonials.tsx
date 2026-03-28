"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP Product, TechCorp",
    avatar: "https://i.pravatar.cc/150?img=11",
    feedback: "Exceptional designer who truly understands the intersection of aesthetics and usability. Our conversion rates increased by 40% after the redesign.",
    stars: 5,
  },
  {
    name: "Marcus Rivera",
    role: "CTO, FinanceFlow",
    avatar: "https://i.pravatar.cc/150?img=32",
    feedback: "Working with this designer was a game-changer for our startup. The attention to detail and speed of delivery was remarkable. Highly recommended!",
    stars: 5,
  },
  {
    name: "Emily Park",
    role: "Design Lead, Nexus",
    avatar: "https://i.pravatar.cc/150?img=47",
    feedback: "A rare talent who combines pixel-perfect craft with strategic thinking. Delivered our complete design system on time and it's been adopted across teams.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative">
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-1/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 mb-6"
          >
            <div className="w-8 h-px bg-linear-to-r from-accent-2 to-accent-3" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-accent-1">
              Feedback
            </span>
            <div className="w-8 h-px bg-linear-to-l from-accent-2 to-accent-3" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-text-primary mb-8"
          >
            What Clients Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-lg text-text-secondary leading-relaxed"
          >
            Hear from the people I've had the privilege of working with.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-bg-card border border-border-subtle backdrop-blur-xl group hover:border-accent-1/40 hover:bg-bg-card-hover transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <div className="flex gap-1.5">
                  {[...Array(testimonial.stars)].map((_, j) => (
                    <Star key={j} className="w-4.5 h-4.5 fill-yellow-400 text-yellow-400 shadow-yellow-400/50" />
                  ))}
                </div>
                
                <p className="text-lg font-medium text-text-secondary leading-relaxed italic relative">
                  <span className="text-5xl font-serif text-accent-2 opacity-10 absolute -top-8 -left-6">"</span>
                  {testimonial.feedback}
                </p>
              </div>

              <div className="mt-12 flex items-center gap-5 border-t border-border-subtle pt-8 group-hover:border-accent-1/20 transition-colors">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 bg-accent-1 blur-md rounded-full scale-0 group-hover:scale-110 transition-transform opacity-30" />
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="rounded-full border-2 border-border-subtle transition-all duration-300 relative group-hover:border-accent-2 z-10 object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm font-medium text-text-muted">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
