import { render, screen } from "@testing-library/react";
import { testimonials } from "./Testimonials";
import Testimonials from "./Testimonials";
import { describe, test, expect, vi } from "vitest";
import React from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
    h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
      <h2 {...props}>{children}</h2>
    ),
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
      <p {...props}>{children}</p>
    ),
  },
}));

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  Star: (props: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="star-icon" {...props} />
  ),
}));

// Mock next/image to avoid optimization-related issues
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} />
  ),
}));

describe("Testimonials Component Rendering", () => {
  test("renders the section heading", () => {
    render(<Testimonials />);
    expect(screen.getByText("What Clients Say")).toBeDefined();
    expect(screen.getByText("Feedback")).toBeDefined();
  });

  test("renders all testimonials with their details", () => {
    render(<Testimonials />);

    testimonials.forEach(testimonial => {
      // Check for name, role, and feedback text
      expect(screen.getAllByText(testimonial.name).length).toBeGreaterThan(0);
      expect(screen.getAllByText(testimonial.role).length).toBeGreaterThan(0);
      expect(screen.getAllByText(testimonial.feedback).length).toBeGreaterThan(0);

      // Check for the avatar image
      const avatar = screen.getByAltText(testimonial.name);
      expect(avatar).toBeDefined();
    });
  });

  test("renders the correct number of stars for each testimonial", () => {
    render(<Testimonials />);

    // Total stars should equal the sum of stars in the testimonials array
    const totalStarsExpected = testimonials.reduce((acc, t) => acc + t.stars, 0);
    const starIcons = screen.getAllByTestId("star-icon");
    expect(starIcons.length).toBe(totalStarsExpected);
  });
});
