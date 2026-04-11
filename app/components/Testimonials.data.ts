export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  feedback: string;
  stars: number;
}

export const testimonials: Testimonial[] = [
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
