import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import InteractiveWrapper from "./providers/InteractiveWrapper";
import ScrollProgress from "./components/ScrollProgress";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aether | Cyber-Luxury Digital Experiences",
  description: "Next-gen portfolio showcasing premium intersection of design and technical excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-body bg-bg-primary selection:bg-accent-1/20 selection:text-white"
        suppressHydrationWarning
      >
        <ScrollProgress />
        <InteractiveWrapper>{children}</InteractiveWrapper>
      </body>
    </html>
  );
}
