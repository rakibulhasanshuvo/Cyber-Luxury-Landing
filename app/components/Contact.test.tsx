import { render, screen } from "@testing-library/react";
import Contact from "./Contact";
import { describe, test, expect, vi } from "vitest";

// @vitest-environment jsdom
import React from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => {
  type MotionProps = { whileInView?: unknown, initial?: unknown, viewport?: unknown, animate?: unknown, exit?: unknown, transition?: unknown, variants?: unknown, whileHover?: unknown, whileTap?: unknown, whileDrag?: unknown, whileFocus?: unknown };

  return {
    motion: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      div: ({ children, whileInView, initial, viewport, animate, exit, transition, variants, whileHover, whileTap, whileDrag, whileFocus, ...props }: React.ComponentPropsWithoutRef<"div"> & MotionProps) => (
        <div {...props}>{children}</div>
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      h2: ({ children, whileInView, initial, viewport, animate, exit, transition, variants, whileHover, whileTap, whileDrag, whileFocus, ...props }: React.ComponentPropsWithoutRef<"h2"> & MotionProps) => (
        <h2 {...props}>{children}</h2>
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      p: ({ children, whileInView, initial, viewport, animate, exit, transition, variants, whileHover, whileTap, whileDrag, whileFocus, ...props }: React.ComponentPropsWithoutRef<"p"> & MotionProps) => (
        <p {...props}>{children}</p>
      ),
    },
  };
});

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  Mail: (props: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="mail-icon" {...props} />
  ),
  Share2: (props: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="share2-icon" {...props} />
  ),
  Send: (props: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="send-icon" {...props} />
  ),
}));

describe("Contact Component", () => {
  test("renders the section headings", () => {
    render(<Contact />);
    expect(screen.getByText("Let's Connect")).toBeDefined();
    // The h2 element has mixed content due to the span
    // textContent would be "Ready to build something epic?"
    // However, getByText matches elements with exact text by default.
    // The easiest way is to match by part of the text, or use multiple getByText
    expect(screen.getByText(/Ready to build something/)).toBeDefined();
    expect(screen.getByText("epic?")).toBeDefined();
    expect(screen.getByText("I'm currently taking on new projects.")).toBeDefined();
  });

  test("renders contact links with correct attributes", () => {
    render(<Contact />);

    // Email link
    const emailLinks = screen.getAllByRole("link", { name: /hello@designer\.com/i });
    expect(emailLinks.length).toBeGreaterThan(0);
    expect(emailLinks[0].getAttribute("href")).toBe("mailto:hello@designer.com");

    // LinkedIn link
    const linkedinLinks = screen.getAllByRole("link", { name: /LinkedIn Profile/i });
    expect(linkedinLinks.length).toBeGreaterThan(0);
    expect(linkedinLinks[0].getAttribute("href")).toBe("https://linkedin.com");
    expect(linkedinLinks[0].getAttribute("target")).toBe("_blank");
    expect(linkedinLinks[0].getAttribute("rel")).toBe("noopener noreferrer");
  });

  test("renders form fields with correct validation attributes", () => {
    render(<Contact />);

    // Name field
    const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
    expect(nameInput).toBeDefined();
    expect(nameInput.type).toBe("text");
    expect(nameInput.required).toBe(true);
    expect(nameInput.getAttribute("maxLength")).toBe("100");

    // Email field
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    expect(emailInput).toBeDefined();
    expect(emailInput.type).toBe("email");
    expect(emailInput.required).toBe(true);
    expect(emailInput.getAttribute("maxLength")).toBe("254");

    // Message field
    const messageTextarea = screen.getByLabelText(/Message/i) as HTMLTextAreaElement;
    expect(messageTextarea).toBeDefined();
    expect(messageTextarea.required).toBe(true);
    expect(messageTextarea.getAttribute("maxLength")).toBe("1000");
  });

  test("renders the submit button", () => {
    render(<Contact />);

    const submitBtns = screen.getAllByRole("button", { name: /Send Inquiry/i }) as HTMLButtonElement[];
    expect(submitBtns.length).toBeGreaterThan(0);
    expect(submitBtns[0].type).toBe("submit");
  });
});
