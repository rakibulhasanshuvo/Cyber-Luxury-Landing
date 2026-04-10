/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { testimonials } from "./Testimonials";
import Testimonials from "./Testimonials";
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
  Star: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="star-icon" {...props} />
  ),
}));

/**
 * @vitest-environment happy-dom
 */

// Mock next/image to avoid optimization-related issues
vi.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ fill, ...props }: React.ComponentPropsWithoutRef<"img"> & { fill?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} />
  ),
}));

describe("Testimonials Component Rendering", () => {
  test("renders the section heading", () => {
    const { unmount } = render(<Testimonials />);
    expect(screen.getByText("What Clients Say")).toBeDefined();
    expect(screen.getByText("Feedback")).toBeDefined();
    unmount();
  });

  test("renders all testimonials with their details", () => {
    const { unmount } = render(<Testimonials />);

    testimonials.forEach(testimonial => {
      // Check for name, role, and feedback text
      expect(screen.getAllByText(testimonial.name).length).toBeGreaterThan(0);
      expect(screen.getAllByText(testimonial.role).length).toBeGreaterThan(0);
      expect(screen.getAllByText(testimonial.feedback).length).toBeGreaterThan(0);

      // Check for the avatar image
      const avatar = screen.getAllByAltText(testimonial.name)[0];
      expect(avatar).toBeDefined();
    });

    unmount();
  });

  test("renders the correct number of stars for each testimonial", () => {
    const { unmount } = render(<Testimonials />);

    // Total stars should equal the sum of stars in the testimonials array
    const totalStarsExpected = testimonials.reduce((acc, t) => acc + t.stars, 0);
    const starIcons = screen.getAllByTestId("star-icon");
    expect(starIcons.length).toBe(totalStarsExpected);

    unmount();
  });
});
