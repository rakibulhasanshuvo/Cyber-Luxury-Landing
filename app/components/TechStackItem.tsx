"use client";

import { cn } from "@/lib/utils";
import type { TechStackData } from "./Experience.data";

interface TechStackItemProps {
  tech: TechStackData;
}

export default function TechStackItem({ tech }: TechStackItemProps) {
  return (
    <div className="group p-6 rounded-2xl glass-card border-white/5 hover:border-accent-1/30 transition-all duration-500">
      <tech.icon className={cn("w-8 h-8 mb-4 transition-transform group-hover:scale-110", tech.color)} />
      <span className="text-sm font-bold tracking-widest text-text-muted group-hover:text-white transition-colors uppercase">
        {tech.name}
      </span>
    </div>
  );
}
