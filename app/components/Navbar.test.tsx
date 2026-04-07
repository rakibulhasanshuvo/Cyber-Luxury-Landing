import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import Navbar from "./Navbar";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => ({
  motion: {
    nav: ({ children, ...props }: React.ComponentPropsWithoutRef<"nav">) => (
      <nav {...props}>{children}</nav>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  Menu: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="menu-icon" {...props} />
  ),
  X: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="x-icon" {...props} />
  ),
  Code: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="code-icon" {...props} />
  ),
}));

describe("Navbar Component", () => {
  let addEventListenerSpy: any;
  let removeEventListenerSpy: any;

  beforeEach(() => {
    // Reset window.scrollY to 0 before each test
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });

    // Use fake timers to better control async behavior and animation frames
    vi.useFakeTimers();

    // Mock requestAnimationFrame using setTimeout
    vi.stubGlobal(
      "requestAnimationFrame",
      (cb: FrameRequestCallback) => {
        return setTimeout(() => cb(Date.now()), 0);
      }
    );
    vi.stubGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));

    addEventListenerSpy = vi.spyOn(window, "addEventListener");
    removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    cleanup();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test("renders desktop navigation correctly", () => {
    render(<Navbar />);

    // Logo text
    expect(screen.getByText("Senior UI/UX")).toBeDefined();

    // Check desktop links are present
    const links = ["Work", "About", "Testimonials", "Contact"];
    links.forEach(link => {
      // It might match multiple if mobile menu is open, but it's not open initially.
      expect(screen.getAllByText(link)[0]).toBeDefined();
    });

    // Hire me button
    expect(screen.getAllByText("Hire me")[0]).toBeDefined();
  });

  test("toggles mobile menu on button click", () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole("button", { name: "Open menu" });

    // Initially menu icon should be visible, and X shouldn't
    expect(screen.getByTestId("menu-icon")).toBeDefined();
    expect(screen.queryByTestId("x-icon")).toBeNull();

    // Click to open menu
    fireEvent.click(toggleButton);

    // Now X should be visible and Menu hidden
    expect(screen.queryByTestId("menu-icon")).toBeNull();
    expect(screen.getByTestId("x-icon")).toBeDefined();

    // Button aria-label should update
    expect(toggleButton.getAttribute("aria-label")).toBe("Close menu");

    // The mobile navigation links should be visible. We can check the number of matching texts.
    // E.g. "Work" will appear twice now.
    expect(screen.getAllByText("Work").length).toBe(2);

    // Click a link to close menu
    const mobileLink = screen.getAllByText("Work")[1];
    fireEvent.click(mobileLink);

    // Menu should be closed
    expect(screen.getByTestId("menu-icon")).toBeDefined();
    expect(screen.queryByTestId("x-icon")).toBeNull();
  });

  test("handles scroll event to update styling", () => {
    render(<Navbar />);

    const header = screen.getByRole("banner");

    // Initial state: not scrolled
    expect(header.className).not.toContain("bg-bg-primary/90");
    expect(header.className).toContain("bg-transparent");

    // Simulate scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true });
      fireEvent.scroll(window);
    });

    // Fast-forward fake timers to run the requestAnimationFrame callback
    act(() => {
      vi.runAllTimers();
    });

    // state should be updated
    expect(header.className).toContain("bg-bg-primary/90");
    expect(header.className).toContain("backdrop-blur-xl");
    expect(header.className).not.toContain("bg-transparent");

    // Simulate scroll back to top
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
      fireEvent.scroll(window);
    });

    // Fast-forward fake timers again
    act(() => {
      vi.runAllTimers();
    });

    expect(header.className).not.toContain("bg-bg-primary/90");
    expect(header.className).toContain("bg-transparent");
  });

  test("cleans up scroll event listener and animation frame on unmount", () => {
    const { unmount } = render(<Navbar />);

    expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  test("cancels animation frame on unmount if a scroll was occurring", () => {
    const { unmount } = render(<Navbar />);

    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame");

    // Trigger scroll
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true, configurable: true });
      fireEvent.scroll(window);
    });

    unmount();

    expect(cancelSpy).toHaveBeenCalled();
  });
});
