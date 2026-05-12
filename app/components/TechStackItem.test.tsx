/**
 * @vitest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import TechStackItem from "./TechStackItem";
import type { TechStackData } from "./Experience.data";
import { Terminal } from "lucide-react";
import React from "react";

// Mock lucide-react to avoid icon rendering issues and facilitate testing
vi.mock("lucide-react", () => ({
  Terminal: (props: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="tech-icon" {...props} />
  ),
}));

describe("TechStackItem Component", () => {
  afterEach(() => {
    cleanup();
  });

  const mockTech: TechStackData = {
    name: "Terminal",
    icon: Terminal,
    color: "text-green-500",
  };

  test("renders tech name", () => {
    render(<TechStackItem tech={mockTech} />);
    expect(screen.getByText(mockTech.name)).toBeDefined();
  });

  test("renders tech icon with correct color class", () => {
    render(<TechStackItem tech={mockTech} />);
    const icon = screen.getByTestId("tech-icon");
    expect(icon).toBeDefined();
    // Use className as a string because it might be a complex object or string depending on mock
    expect(icon.className).toContain(mockTech.color);
    expect(icon.className).toContain("w-8 h-8");
  });
});
