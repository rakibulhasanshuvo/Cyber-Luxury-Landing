import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import InteractiveWrapper from "./InteractiveWrapper";
import React from "react";

// Mock framer-motion
vi.mock("framer-motion", () => {
  return {
    motion: {
      div: ({ children, style, className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
        // JSDOM sometimes adds "px" to certain numerical style properties like scaleX if passed inline.
        // Or in general, the testing env. Let's just pass it through exactly.
        return (
          <div data-testid="motion-div" style={style as React.CSSProperties} className={className} {...props}>
            {children}
          </div>
        );
      },
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useScroll: vi.fn(() => ({ scrollYProgress: 0.75 })),
  };
});

describe("InteractiveWrapper", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test("renders children correctly", () => {
    render(
      <InteractiveWrapper>
        <div data-testid="child-element">Child Content</div>
      </InteractiveWrapper>
    );
    expect(screen.getByTestId("child-element")).toBeDefined();
    expect(screen.getByText("Child Content")).toBeDefined();
  });

  test("shows loading spinner initially and hides it after 600ms", () => {
    render(
      <InteractiveWrapper>
        <div>Content</div>
      </InteractiveWrapper>
    );

    // Spinner should be visible initially (via animate-spin class)
    const motionDivs = screen.getAllByTestId("motion-div");
    const loaderContainer = motionDivs.find(div => div.className.includes("fixed inset-0"));
    expect(loaderContainer).toBeDefined();

    // Advance time by 600ms
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // Loader should be removed
    const motionDivsAfter = screen.getAllByTestId("motion-div");
    const loaderContainerAfter = motionDivsAfter.find(div => div.className.includes("fixed inset-0 z-[200]"));
    expect(loaderContainerAfter).toBeUndefined();
  });

  test("applies scrollYProgress to the progress bar", () => {
    render(
      <InteractiveWrapper>
        <div>Content</div>
      </InteractiveWrapper>
    );

    const motionDivs = screen.getAllByTestId("motion-div");
    const progressBar = motionDivs.find(div => div.className.includes("bg-linear-to-r"));

    expect(progressBar).toBeDefined();

    // Some JSDOM versions auto-append "px" to unitless numbers assigned to style object, or React does it.
    // So we match either "0.75" or "0.75px"
    const scaleXValue = (progressBar?.style as CSSStyleDeclaration & { scaleX?: string })?.scaleX || "";
    expect(scaleXValue.replace('px', '')).toBe("0.75");
  });

  test("shows cursor glow on mousemove with correct coordinates", () => {
    render(
      <InteractiveWrapper>
        <div>Content</div>
      </InteractiveWrapper>
    );

    let divs = screen.queryAllByRole('generic');
    let cursorGlow = Array.from(divs).find(div => div.className && typeof div.className === 'string' && div.className.includes('blur-[120px]'));

    expect(cursorGlow).toBeUndefined();

    // Trigger mouse move
    act(() => {
      fireEvent.mouseMove(window, { clientX: 150, clientY: 250 });
    });

    // After mouse move, the cursor glow should appear
    divs = screen.queryAllByRole('generic');
    cursorGlow = Array.from(divs).find(div => div.className && typeof div.className === 'string' && div.className.includes('blur-[120px]'));

    expect(cursorGlow).toBeDefined();
    expect(cursorGlow?.style.left).toBe("150px");
    expect(cursorGlow?.style.top).toBe("250px");
    expect(cursorGlow?.style.opacity).toBe("1");
  });
});
