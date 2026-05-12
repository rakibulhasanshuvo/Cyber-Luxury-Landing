"use client";

import { Code } from "lucide-react";
import { socialLinks } from "./Footer.data";
import { validateSafeUrl } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-24 border-t border-border-subtle/50 bg-bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-accent-1/20 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-linear-to-br from-accent-1 to-accent-3 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Code className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-accent-2 transition-colors">
                Senior UI/UX
              </span>
            </a>
            <p className="text-text-muted text-sm font-medium">
              &copy; {currentYear} Designer Portfolio. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={validateSafeUrl(social.href)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-muted hover:text-white hover:bg-white/5 hover:border-accent-1 transition-all group/social"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5 group-hover/social:scale-110 transition-all" />
              </a>
            ))}
          </div>
        </div>

        {/* Floating Decorative Orbs */}
        <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-accent-1/5 blur-[100px] rounded-full" />
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-accent-3/5 blur-[80px] rounded-full" />
      </div>
    </footer>
  );
}
