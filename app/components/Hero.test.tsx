import { render, screen, act } from "@testing-library/react";
import Hero, { Counter, stats } from "./Hero";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    div: ({ children, whileHover, ...props }: React.ComponentPropsWithoutRef<"div"> & { whileHover?: unknown }) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: React.ComponentPropsWithoutRef<"h1">) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
      <p {...props}>{children}</p>
    ),
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}));

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  ArrowRight: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="arrow-right-icon" {...props} />
  ),
  Download: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="download-icon" {...props} />
  ),
  Star: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="star-icon" {...props} />
  ),
}));

// Mock IntersectionObserver
const mockIntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver;
window.IntersectionObserver = mockIntersectionObserver;

describe("Hero Component Rendering", () => {
  beforeEach(() => {
    // Reset IntersectionObserver mock for structural tests
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test("renders the heading and descriptions", () => {
    render(<Hero />);
    expect(screen.getByText(/Crafting/i)).toBeDefined();
    expect(screen.getByText(/digital worlds/i)).toBeDefined();
    expect(screen.getByText(/Global-standard product design/i)).toBeDefined();
  });

  test("renders CTAs with proper links", () => {
    render(<Hero />);

    // Use getAllByRole as there could be multiple links with similar names (though unexpected) or we just need the first
    const exploreWorkLinks = screen.getAllByRole("link", { name: /Explore Work/i });
    expect(exploreWorkLinks[0].getAttribute("href")).toBe("#work");

    const downloadCvLinks = screen.getAllByRole("link", { name: /Download CV/i });
    expect(downloadCvLinks[0].getAttribute("href")).toBe("https://example.com/cv.pdf");
    expect(downloadCvLinks[0].getAttribute("target")).toBe("_blank");
    expect(downloadCvLinks[0].getAttribute("rel")).toBe("noopener noreferrer");
  });

  test("renders stats with labels", () => {
    render(<Hero />);

    stats.forEach((stat) => {
      expect(screen.getAllByText(stat.label).length).toBeGreaterThan(0);

      // Need to escape the suffix string for RegExp if we use it, or just use string match
      const escapedSuffix = stat.suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (escapedSuffix) {
        expect(screen.getAllByText(new RegExp(escapedSuffix)).length).toBeGreaterThan(0);
      }
    });
  });
});

describe("Counter Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  test("increments count when in view", () => {
    // Create a manual trigger for IntersectionObserver
    let triggerIntersection: (entries: IntersectionObserverEntry[]) => void = () => {};

    window.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        triggerIntersection = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;

    // Counter initial render
    const suffixStr = "%";

    // Test the specific element rather than text matching loosely due to Hero mounting counts etc
    // In isolation, we know it's a span, but testing library getByText works.
    // We just need to search within the container to be safe.
    const { container } = render(<Counter target={100} suffix={suffixStr} />);

    // Initially should be 0%
    expect(container.textContent).toBe("0%");

    // Trigger intersection
    act(() => {
      triggerIntersection([{ isIntersecting: true, target: document.createElement('span') } as unknown as IntersectionObserverEntry]);
    });

    // Advance timers by half the duration (1000ms out of 2000ms)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Count should be around 50 (might be exactly 50 or slightly off due to float math, so we check it's changed)
    // 100 / (2000/16) * (1000/16) = 50
    // We expect it to not be 0% and not be 100%
    const currentText = container.textContent;
    const currentNumber = parseInt(currentText?.replace("%", "") || "0");
    expect(currentNumber).toBeGreaterThan(0);
    expect(currentNumber).toBeLessThan(100);

    // Advance to end (need a bit more time for the final set to occur)
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    // Should reach exactly 100%
    expect(container.textContent).toBe("100%");
  });

  test("does not increment if not in view", () => {
    // Create a manual trigger that simulates NOT intersecting
    let triggerIntersection: (entries: IntersectionObserverEntry[]) => void = () => {};

    window.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        triggerIntersection = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;

    const { container } = render(<Counter target={100} suffix="%" />);

    // Trigger non-intersection
    act(() => {
      triggerIntersection([{ isIntersecting: false, target: document.createElement('span') } as unknown as IntersectionObserverEntry]);
    });

    // Advance timers
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Count should still be 0% (in isolated Counter, it's just 1 element)
    expect(container.textContent).toBe("0%");
  });
});