import { render, screen } from "@testing-library/react";
import Marquee, { companies } from "./Marquee";
import { describe, test, expect, vi } from "vitest";
import type { ComponentPropsWithoutRef } from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => ({
  motion: {
    span: ({ children, ...props }: ComponentPropsWithoutRef<"span"> & { initial?: unknown; whileInView?: unknown; transition?: unknown }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { initial, whileInView, transition, ...rest } = props;
      return <span {...rest}>{children}</span>;
    },
    div: ({ children, ...props }: ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  Chrome: (props: ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  CreditCard: (props: ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  Car: (props: ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  Figma: (props: ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  Slack: (props: ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  ShoppingBag: (props: ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  Zap: (props: ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
  Database: (props: ComponentPropsWithoutRef<"div">) => <div data-testid="company-icon" {...props} />,
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
