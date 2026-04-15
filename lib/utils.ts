import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Lightweight custom throttle function using requestAnimationFrame
// to ensure the callback runs at most once per animation frame (~60fps).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => void>(fn: T) {
  let frameId: number | null = null;

  const throttled = (...args: Parameters<T>) => {
    if (frameId === null) {
      frameId = window.requestAnimationFrame(() => {
        fn(...args);
        frameId = null;
      });
    }
  };

  throttled.cancel = () => {
    if (frameId !== null) {
      if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
        window.cancelAnimationFrame(frameId);
      }
      frameId = null;
    }
  };

  return throttled;
}
