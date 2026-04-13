/**
 * @vitest-environment jsdom
 */
import { render, screen, act } from "@testing-library/react";
import Hero from "./Hero";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import type { ComponentPropsWithoutRef } from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => {
  return {
    motion: {
      div: ({ children, ...props }: ComponentPropsWithoutRef<"div"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown; variants?: unknown; style?: unknown; whileHover?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, variants, style, whileHover, ...rest } = props;
        return <div {...rest}>{children}</div>;
      },
      h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown; variants?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, variants, ...rest } = props;
        return <h1 {...rest}>{children}</h1>;
      },
      p: ({ children, ...props }: ComponentPropsWithoutRef<"p"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown; variants?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, variants, ...rest } = props;
        return <p {...rest}>{children}</p>;
      },
    },
    useScroll: () => ({ scrollY: 0 }),
    useTransform: () => 0,
  };
});

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  ArrowRight: (props: ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="arrow-right-icon" {...props} />
  ),
  Download: (props: ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="download-icon" {...props} />
  ),
  Star: (props: ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="star-icon" {...props} />
  ),
}));

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(public callback: IntersectionObserverCallback) {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}

describe("Hero Component", () => {
  let originalEnv: string | undefined;

  beforeEach(() => {
    // Setup Fake Timers
    vi.useFakeTimers();

    // Save original env
    originalEnv = process.env.NEXT_PUBLIC_CV_URL;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    process.env.NEXT_PUBLIC_CV_URL = originalEnv;
  });

  test("renders static text and labels correctly", () => {
    // Mock IntersectionObserver
    window.IntersectionObserver = MockIntersectionObserver;

    render(<Hero />);

    // Check main text
    expect(screen.getByText(/Crafting/i)).toBeDefined();
    expect(screen.getByText(/digital worlds/i)).toBeDefined();
    expect(screen.getByText(/Global-standard product design/i)).toBeDefined();
    expect(screen.getByText(/Available for high-stakes projects/i)).toBeDefined();

    // Check stats labels
    expect(screen.getByText("Projects Done")).toBeDefined();
    expect(screen.getByText("Years Exp")).toBeDefined();
    expect(screen.getByText("Global Awards")).toBeDefined();
    expect(screen.getByText("Happy Clients")).toBeDefined();

    // Check explore button
    expect(screen.getByText("Explore Work")).toBeDefined();
  });

  test("conditionally renders Download CV button based on env variable", () => {
    window.IntersectionObserver = MockIntersectionObserver;

    // Test without CV URL
    process.env.NEXT_PUBLIC_CV_URL = "";
    const { unmount } = render(<Hero />);
    expect(screen.queryByText(/Download CV/i)).toBeNull();

    unmount();

    // Test with CV URL
    process.env.NEXT_PUBLIC_CV_URL = "https://example.com/cv.pdf";
    render(<Hero />);
    const downloadLink = screen.getByText(/Download CV/i);
    expect(downloadLink).toBeDefined();
    expect(downloadLink.closest("a")?.getAttribute("href")).toBe("https://example.com/cv.pdf");
  });

  test("animates counters from 0 to their target values over time", () => {
    // Track observer callbacks to trigger intersection manually
    const observerCallbacks: IntersectionObserverCallback[] = [];

    class TrackingMockIntersectionObserver extends MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        super(callback);
        observerCallbacks.push(callback);
      }
    }

    window.IntersectionObserver = TrackingMockIntersectionObserver;

    render(<Hero />);

    // Initial state: counters should be 0. Use queryAllByText as "0" might appear in other places
    expect(screen.getAllByText("0+").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("0%").length).toBeGreaterThanOrEqual(1);

    // Trigger intersection
    act(() => {
      observerCallbacks.forEach(cb => {
        cb([{ isIntersecting: true, target: document.createElement("span") } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
      });
    });

    // Advance timers by exactly 2100ms. Since the interval is 16ms, 2000ms is 125 intervals.
    // Advancing slightly more than 2000ms to guarantee hitting the stop condition
    act(() => {
      vi.advanceTimersByTime(2100);
    });

    // Now the final values should be displayed exactly
    expect(screen.getByText("120+")).toBeDefined();
    expect(screen.getByText("10+")).toBeDefined();
    expect(screen.getByText("45")).toBeDefined();
    expect(screen.getByText("99%")).toBeDefined();
  });
});
