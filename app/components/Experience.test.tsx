/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Experience from "./Experience";
import { experiences, techStack } from "./Experience.data";
import { describe, test, expect, vi } from "vitest";
import type { ComponentPropsWithoutRef } from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => {
  return {
    motion: {
      div: ({ children, ...props }: ComponentPropsWithoutRef<"div"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, ...rest } = props;
        return <div {...rest}>{children}</div>;
      },
      h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, ...rest } = props;
        return <h2 {...rest}>{children}</h2>;
      },
      p: ({ children, ...props }: ComponentPropsWithoutRef<"p"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, ...rest } = props;
        return <p {...rest}>{children}</p>;
      },
    },
  };
});

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  Briefcase: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="briefcase-icon" {...props} />
  ),
  Award: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="award-icon" {...props} />
  ),
  Calendar: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="calendar-icon" {...props} />
  ),
  MapPin: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="mappin-icon" {...props} />
  ),
  Figma: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="figma-icon" {...props} />
  ),
  Cpu: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="cpu-icon" {...props} />
  ),
  Box: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="box-icon" {...props} />
  ),
  Terminal: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="terminal-icon" {...props} />
  )
}));

describe("Experience Component Rendering", () => {
  test("renders the section headings and recognition block", () => {
    const { unmount } = render(<Experience />);

    expect(screen.getByText("Career Journey")).toBeDefined();
    // Because it contains a span with gradient-text, getByText won't match "Building Impact" exactly.
    // So we match Building and Impact separately or use a custom matcher, but since we know the span structure
    // we can use regex or match substrings.
    expect(screen.getByText(/Building/)).toBeDefined();
    expect(screen.getByText(/Impact/)).toBeDefined();

    expect(screen.getByText("Recognition")).toBeDefined();
    expect(screen.getByText("Awwwards & FWA Portfolio Award")).toBeDefined();

    unmount();
  });

  test("renders all experiences with their details", () => {
    const { unmount } = render(<Experience />);

    experiences.forEach((exp) => {
      expect(screen.getAllByText(exp.company).length).toBeGreaterThan(0);
      expect(screen.getAllByText(exp.role).length).toBeGreaterThan(0);
      expect(screen.getAllByText(exp.period).length).toBeGreaterThan(0);
      expect(screen.getAllByText(exp.location).length).toBeGreaterThan(0);
      expect(screen.getAllByText(exp.desc).length).toBeGreaterThan(0);

      exp.tags.forEach(tag => {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      });
    });

    unmount();
  });

  test("renders the tech stack items", () => {
    const { unmount } = render(<Experience />);

    techStack.forEach((tech) => {
      expect(screen.getAllByText(tech.name).length).toBeGreaterThan(0);
    });

    unmount();
  });
});
