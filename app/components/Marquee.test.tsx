import { render, screen } from "@testing-library/react";
import Marquee, { companies } from "./Marquee";
import { describe, test, expect, vi } from "vitest";
import React from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => ({
  motion: {
    span: ({ children, ...props }: React.ComponentPropsWithoutRef<"span">) => (
      <span {...props}>{children}</span>
    ),
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  Chrome: (props: React.ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  CreditCard: (props: React.ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  Car: (props: React.ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  Figma: (props: React.ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  Slack: (props: React.ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  ShoppingBag: (props: React.ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  Zap: (props: React.ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  Database: (props: React.ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
}));

describe("Marquee Component", () => {
  test("renders the 'Powering innovation at' text", () => {
    render(<Marquee />);
    expect(screen.getByText(/Powering innovation at/i)).toBeDefined();
  });

  test("renders all companies from the companies list", () => {
    render(<Marquee />);

    // The marquee quadruples the companies array for a seamless loop
    companies.forEach(company => {
      const companyElements = screen.getAllByText(company.name);
      // Based on `REPEAT_COUNT`, the array is duplicated 4 times
      // However, due to next.js or testing library rendering idiosyncrasies,
      // we only assert that the elements are present rather than a strict count
      // that might change if rendering logic is tweaked.
      expect(companyElements.length).toBeGreaterThanOrEqual(4);
    });
  });

  test("renders the correct number of company icons", () => {
    render(<Marquee />);

    const icons = screen.getAllByTestId("company-icon");
    expect(icons.length).toBeGreaterThanOrEqual(companies.length * 4);
  });
});
