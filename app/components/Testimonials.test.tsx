import { render, screen } from "@testing-library/react";
import { testimonials } from "./Testimonials";
import Testimonials from "./Testimonials";
import { describe, test, expect, vi } from "vitest";
import React from "react";

/**
 * @vitest-environment jsdom
 */

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    div: ({ children, whileInView, initial, viewport, transition, ...props }: React.ComponentPropsWithoutRef<"div"> & { whileInView?: unknown, initial?: unknown, viewport?: unknown, transition?: unknown }) => (
      <div {...props}>{children}</div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h2: ({ children, whileInView, initial, viewport, ...props }: React.ComponentPropsWithoutRef<"h2"> & { whileInView?: unknown, initial?: unknown, viewport?: unknown }) => (
      <h2 {...props}>{children}</h2>
    ),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    p: ({ children, whileInView, initial, viewport, ...props }: React.ComponentPropsWithoutRef<"p"> & { whileInView?: unknown, initial?: unknown, viewport?: unknown }) => (
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ alt, fill, ...props }: React.ComponentPropsWithoutRef<"img"> & { fill?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt || "Image"} {...props} />
  ),
}));

describe("Testimonials Component Rendering", () => {
  test("renders the section heading", () => {
    render(<Testimonials />);
    expect(screen.getAllByText("What Clients Say").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Feedback").length).toBeGreaterThan(0);
  });

  test("renders all testimonials with their details", () => {
    render(<Testimonials />);

    testimonials.forEach(testimonial => {
      // Check for name, role, and feedback text
      expect(screen.getAllByText(testimonial.name).length).toBeGreaterThan(0);
      expect(screen.getAllByText(testimonial.role).length).toBeGreaterThan(0);
      expect(screen.getAllByText(testimonial.feedback).length).toBeGreaterThan(0);

      // Check for the avatar image
      const avatars = screen.getAllByAltText(testimonial.name);
      expect(avatars.length).toBeGreaterThan(0);
    });
  });

  test("renders the correct number of stars for each testimonial", () => {
    render(<Testimonials />);

    // Total stars should equal the sum of stars in the testimonials array
    const totalStarsExpected = testimonials.reduce((acc, t) => acc + t.stars, 0);
    const starIcons = screen.getAllByTestId("star-icon");
    expect(starIcons.length).toBeGreaterThanOrEqual(totalStarsExpected);
  });
});
