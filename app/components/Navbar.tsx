"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-bg-primary/90 backdrop-blur-xl border-border-subtle shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-linear-to-br from-accent-1 to-accent-3 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(108,92,231,0.3)] group-hover:shadow-[0_0_25px_rgba(108,92,231,0.5)] transition-all">
            <Code className="w-4.5 h-4.5 text-white" strokeWidth={3} />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-text-primary group-hover:text-accent-2 transition-colors">
            Senior UI/UX
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-accent-1 to-accent-3 rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex px-6 py-2.5 bg-linear-to-br from-accent-1 to-accent-4 text-white text-sm font-semibold rounded-lg shadow-[0_4px_20px_rgba(108,92,231,0.3)] hover:shadow-[0_8px_30px_rgba(108,92,231,0.5)] hover:translate-y-[-2px] transition-all relative overflow-hidden group/btn"
          >
            <span className="relative z-10">Hire me</span>
            <div className="absolute top-[-50%] left-[-75%] w-1/2 h-[200%] bg-linear-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] transition-all duration-700 group-hover/btn:left-[125%]" />
          </a>

          <button
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-md bg-white/5 border border-border-subtle hover:border-accent-1/50 transition-all text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[72px] left-0 right-0 bg-bg-primary/95 backdrop-blur-2xl border-b border-border-subtle p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-text-secondary hover:text-text-primary transition-colors border-l-2 border-transparent hover:border-accent-1 pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 w-full py-4 bg-linear-to-r from-accent-1 to-accent-4 text-white text-center font-bold rounded-lg shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Hire me
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
