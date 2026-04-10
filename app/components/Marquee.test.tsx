import { render, screen, cleanup } from "@testing-library/react";
import Marquee, { companies } from "./Marquee";
import { describe, test, expect, vi, afterEach } from "vitest";
import React from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    span: ({ children, whileInView, initial, viewport, animate, transition, ...props }: React.ComponentPropsWithoutRef<"span"> & { whileInView?: unknown, initial?: unknown, viewport?: unknown, animate?: unknown, transition?: unknown }) => (
      <span {...props}>{children}</span>
    ),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    div: ({ children, whileInView, initial, viewport, animate, transition, ...props }: React.ComponentPropsWithoutRef<"div"> & { whileInView?: unknown, initial?: unknown, viewport?: unknown, animate?: unknown, transition?: unknown }) => (
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
  afterEach(cleanup);

  test("renders the 'Powering innovation at' text", () => {
    render(<Marquee />);
    expect(screen.getByText(/Powering innovation at/i)).toBeDefined();
  });

  test("renders all companies from the companies list", () => {
    render(<Marquee />);

    // The marquee quadruples the companies array for a seamless loop
    companies.forEach(company => {
      const companyElements = screen.getAllByText(company.name);
      expect(companyElements.length).toBe(4);
    });
  });

  test("renders the correct number of company icons", () => {
    render(<Marquee />);

    const icons = screen.getAllByTestId("company-icon");
    // 8 companies * 4 repetitions = 32 icons
    expect(icons.length).toBe(companies.length * 4);
  });
});
