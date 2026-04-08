import { render, screen } from "@testing-library/react";
import { testimonials } from "./Testimonials";
import Testimonials from "./Testimonials";
import { describe, test, expect, vi } from "vitest";

// @vitest-environment jsdom
import React from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => {
  const filterProps = (props: any) => {
    const {
      whileInView, initial, viewport, animate, exit, transition,
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
      h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
        <h2 {...filterProps(props)}>{children}</h2>
      ),
      p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
        <p {...filterProps(props)}>{children}</p>
      ),
    },
  };
});

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  Star: ({ fill, ...props }: any) => (
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
      const avatars = screen.getAllByAltText(testimonial.name);
      expect(avatars.length).toBeGreaterThan(0);
    });
  });

  test("renders the correct number of stars for each testimonial", () => {
    // The Testimonial component renders Marquee elements that duplicate the original array for smooth infinite scrolling.
    // So the rendered total stars will be a multiple of the original stars
    render(<Testimonials />);

    // Total stars should equal the sum of stars in the testimonials array
    const totalStarsExpected = testimonials.reduce((acc, t) => acc + t.stars, 0);
    const starIcons = screen.getAllByTestId("star-icon");
    // Since it's duplicated (often 2-3 times depending on the specific implementation, here it seems to be 3 times)
    expect(starIcons.length).toBeGreaterThanOrEqual(totalStarsExpected);
    expect(starIcons.length % totalStarsExpected).toBe(0);
  });
});
