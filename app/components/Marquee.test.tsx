import { render, screen } from "@testing-library/react";
import Marquee, { companies } from "./Marquee";
import { describe, test, expect, vi } from "vitest";
import React from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => ({
  motion: {
    span: ({ children, ...props }: React.ComponentPropsWithoutRef<"span"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, ...rest } = props;
        return <span {...rest}>{children}</span>;
    },
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<"div"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, ...rest } = props;
        return <div {...rest}>{children}</div>;
    },
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

    companies.forEach(company => {
      const companyElements = screen.getAllByText(company.name);
      expect(companyElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  test("renders the correct number of company icons", () => {
    render(<Marquee />);

    const icons = screen.getAllByTestId("company-icon");
    expect(icons.length).toBeGreaterThanOrEqual(companies.length);
  });
});
