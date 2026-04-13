"use client";

import { motion } from "framer-motion";
import { Mail, Share2, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after a few seconds
    setTimeout(() => {
      setIsSubmitted(false);
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-accent-1/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-8 h-px bg-linear-to-r from-accent-1 to-accent-3" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-accent-2">
              Let&apos;s Connect
            </span>
            <div className="w-8 h-px bg-linear-to-l from-accent-1 to-accent-3" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white mb-8"
          >
            Ready to build something <span className="gradient-text">epic?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-lg text-text-secondary font-medium mb-12"
          >
            I&apos;m currently taking on new projects.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <a
              href="mailto:hello@designer.com"
              className="px-8 py-4 rounded-xl bg-white/5 border border-border-glass text-text-primary font-bold flex items-center gap-3 hover:bg-white/10 hover:border-accent-1 transition-all hover:translate-y-[-2px] group"
            >
              <Mail className="w-5 h-5 text-accent-1 group-hover:scale-110 transition-transform" />
              hello@designer.com
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-white/5 border border-border-glass text-text-primary font-bold flex items-center gap-3 hover:bg-white/10 hover:border-accent-2 transition-all hover:translate-y-[-2px] group"
            >
              <Share2 className="w-5 h-5 text-accent-2 group-hover:scale-110 transition-transform" />
              LinkedIn Profile
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto rounded-[32px] overflow-hidden bg-bg-card border border-border-subtle p-8 sm:p-12 relative group shadow-2xl backdrop-blur-3xl"
        >
          <div className="absolute inset-0 bg-linear-to-br from-accent-1/5 via-transparent to-accent-3/5" />
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-text-muted">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-text-muted focus:border-accent-1/50 focus:bg-white/10 focus:outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-text-muted">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    maxLength={254}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-text-muted focus:border-accent-1/50 focus:bg-white/10 focus:outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-text-muted">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  maxLength={1000}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-text-muted focus:border-accent-1/50 focus:bg-white/10 focus:outline-none transition-all resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-5 bg-linear-to-r from-accent-1 to-accent-4 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group/submit ${
                  isSubmitting || isSubmitted
                    ? "opacity-80 cursor-not-allowed shadow-none"
                    : "shadow-accent-1/20 hover:shadow-accent-1/40 hover:bg-accent-1"
                }`}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : isSubmitted ? (
                  <>
                    Message Sent!
                    <CheckCircle2 className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
