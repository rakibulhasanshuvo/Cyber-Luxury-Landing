/**
 * @vitest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import ExperienceItem from "./ExperienceItem";
import type { ExperienceData } from "./Experience.data";
import React from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterProps = (props: any) => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      whileInView, initial, viewport, animate, exit, transition,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      variants, whileHover, whileTap, whileDrag, whileFocus,
      ...rest
    } = props;
    return rest;
  };

  return {
    motion: {
      div: ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => (
        <div {...filterProps(props)}>{children}</div>
      ),
    },
  };
});

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  Calendar: (props: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="calendar-icon" {...props} />
  ),
  MapPin: (props: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="mappin-icon" {...props} />
  ),
}));

describe("ExperienceItem Component", () => {
  afterEach(() => {
    cleanup();
  });

  const mockExp: ExperienceData = {
    company: "Test Company",
    role: "Senior Software Engineer",
    period: "2020 — 2022",
    location: "Remote / San Francisco",
    desc: "Led the development of a high-traffic web application using modern technologies.",
    tags: ["Product Strategy", "Design Systems", "Team Lead"],
  };

  test("renders role, company, period, and location", () => {
    render(<ExperienceItem exp={mockExp} index={0} />);

    expect(screen.getByText(mockExp.role)).toBeDefined();
    expect(screen.getByText(mockExp.company)).toBeDefined();
    expect(screen.getByText(mockExp.period)).toBeDefined();
    expect(screen.getByText(mockExp.location)).toBeDefined();
  });

  test("renders description and tags", () => {
    render(<ExperienceItem exp={mockExp} index={0} />);

    expect(screen.getByText(mockExp.desc)).toBeDefined();
    mockExp.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeDefined();
    });
  });

  test("renders the required icons", () => {
    render(<ExperienceItem exp={mockExp} index={0} />);

    expect(screen.getByTestId("calendar-icon")).toBeDefined();
    expect(screen.getByTestId("mappin-icon")).toBeDefined();
  });
});
