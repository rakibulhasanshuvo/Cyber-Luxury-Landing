"use client";

import { useEffect, useState } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { throttle } from "@/lib/utils";

export default function InteractiveWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorMoving, setIsCursorMoving] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Page Loader
    const timeout = setTimeout(() => setIsLoaded(true), 600);
    
    // Cursor Glow
    const handleMouseMove = throttle((e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (!isCursorMoving) setIsCursorMoving(true);
    });
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleMouseMove);
      handleMouseMove.cancel();
    };
  }, [isCursorMoving]);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-bg-primary flex items-center justify-center pointer-events-none"
          >
            <div className="w-16 h-16 border-4 border-accent-1/20 border-t-accent-1 rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-accent-1 via-accent-2 to-accent-3 z-[110] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Global Cursor Glow Background Effect */}
      {isCursorMoving && (
        <div
          className="fixed pointer-events-none z-[150] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-accent-1/5 blur-[120px] rounded-full sm:block hidden transition-opacity duration-300 pointer-events-none"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            opacity: 1,
            zIndex: -1, // Ensure it's behind content but visible on dark background
          }}
        />
      )}

      {children}
    </>
  );
}
