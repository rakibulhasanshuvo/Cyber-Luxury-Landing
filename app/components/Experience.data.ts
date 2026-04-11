import { Figma, Cpu, Box, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ExperienceTag =
  | "Product Strategy"
  | "Design Systems"
  | "Team Lead"
  | "UX Engineering"
  | "Data Viz"
  | "Animation"
  | "Visual Design"
  | "Branding"
  | "Campaigns";

export interface ExperienceData {
  company: string;
  role: string;
  period: string;
  location: string;
  desc: string;
  tags: ExperienceTag[];
}

export interface TechStackData {
  name: string;
  icon: LucideIcon;
  color: string;
}

export const experiences: ExperienceData[] = [
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

export const techStack: TechStackData[] = [
  { name: "Figma", icon: Figma, color: "text-[#F24E1E]" },
  { name: "React", icon: Cpu, color: "text-[#61DAFB]" },
  { name: "Framer", icon: Box, color: "text-[#0055FF]" },
  { name: "Tailwind", icon: Terminal, color: "text-[#38B2AC]" },
];
