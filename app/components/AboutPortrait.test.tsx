/**
 * @vitest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import AboutPortrait from "./AboutPortrait";
import { describe, test, expect, vi, afterEach } from "vitest";
import type { ComponentPropsWithoutRef } from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => {
  return {
    motion: {
      div: ({ children, ...props }: ComponentPropsWithoutRef<"div"> & { initial?: unknown; whileInView?: unknown; viewport?: unknown; transition?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, whileInView, viewport, transition, ...rest } = props;
        return <div {...rest}>{children}</div>;
      },
    },
  };
});

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  Sparkles: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="sparkles-icon" {...props} />
  ),
}));

// Mock next/image to avoid optimization-related issues
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, sizes, priority, alt, ...props }: React.ComponentPropsWithoutRef<"img"> & { fill?: boolean; sizes?: string; priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt || 'Image'} {...props} />;
  },
}));

afterEach(() => {
  cleanup();
});

describe("AboutPortrait Component Rendering", () => {
  test("renders successfully", () => {
    render(<AboutPortrait />);
    expect(screen.getByAltText("Portrait")).toBeDefined();
  });

  test("renders the portrait image with correct attributes", () => {
    render(<AboutPortrait />);
    const image = screen.getByAltText("Portrait") as HTMLImageElement;
    expect(image.src).toContain("/images/portrait.png");
  });

  test("renders the bio card information", () => {
    render(<AboutPortrait />);
    expect(screen.getByText("Expert Designer")).toBeDefined();
    expect(screen.getByText("Founding Member")).toBeDefined();
  });

  test("renders the Sparkles icon", () => {
    render(<AboutPortrait />);
    expect(screen.getByTestId("sparkles-icon")).toBeDefined();
  });
});
