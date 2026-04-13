import { render, screen } from "@testing-library/react";
import Contact from "./Contact";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

// @vitest-environment jsdom
import React from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => {
  // We need to filter out motion specific props to avoid React warnings
  const filterProps = (props: Record<string, unknown>) => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      whileInView, initial, viewport, animate, exit, transition,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      variants, whileHover, whileTap, whileDrag, whileFocus,
      ...rest
    } = props;
    return rest;
  };

  return {
    motion: {
      div: ({ children, ...props }: React.ComponentPropsWithoutRef<"div"> & { initial?: unknown }) => (
        <div {...filterProps(props)}>{children}</div>
      ),
      h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2"> & { initial?: unknown }) => (
        <h2 {...filterProps(props)}>{children}</h2>
      ),
      p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p"> & { initial?: unknown }) => (
        <p {...filterProps(props)}>{children}</p>
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
  CheckCircle2: (props: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="check-icon" {...props} />
  ),
}));

import { fireEvent, act } from "@testing-library/react";

describe("Contact Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

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
    // Verify icon renders inside the link (since multiple could technically be on page)
    expect(emailLinks[0].querySelector('[data-testid="mail-icon"]')).toBeDefined();

    // LinkedIn link
    const linkedinLinks = screen.getAllByRole("link", { name: /LinkedIn Profile/i });
    expect(linkedinLinks.length).toBeGreaterThan(0);
    expect(linkedinLinks[0].getAttribute("href")).toBe("https://linkedin.com");
    expect(linkedinLinks[0].getAttribute("target")).toBe("_blank");
    expect(linkedinLinks[0].getAttribute("rel")).toBe("noopener noreferrer");
    expect(linkedinLinks[0].querySelector('[data-testid="share2-icon"]')).toBeDefined();
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

  test("handles form submission correctly with states", async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const messageTextarea = screen.getByLabelText(/Message/i);
    const submitBtn = screen.getAllByRole("button", { name: /Send Inquiry/i })[0];

    // Fill out the form
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
    fireEvent.change(messageTextarea, { target: { value: "Let's work together!" } });

    // Submit the form
    fireEvent.click(submitBtn);

    // Verify 'isSubmitting' state
    expect(screen.getByText(/Sending.../i)).toBeDefined();
    expect((submitBtn as HTMLButtonElement).disabled).toBe(true);

    // Fast-forward to resolve the submission promise (1500ms)
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    // Verify 'isSubmitted' state
    expect(screen.getByText(/Message Sent!/i)).toBeDefined();
    expect(screen.getByTestId("check-icon")).toBeDefined();
    expect((submitBtn as HTMLButtonElement).disabled).toBe(true);

    // Fast-forward to resolve the reset timeout (3000ms)
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    // Verify form resets back to original state
    const resetSubmitBtn = screen.getAllByRole("button", { name: /Send Inquiry/i })[0] as HTMLButtonElement;
    expect(resetSubmitBtn).toBeDefined();
    expect(resetSubmitBtn.disabled).toBe(false);

    expect((nameInput as HTMLInputElement).value).toBe("");
    expect((emailInput as HTMLInputElement).value).toBe("");
    expect((messageTextarea as HTMLTextAreaElement).value).toBe("");
  });

  test("validates required fields correctly", () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    const messageTextarea = screen.getByLabelText(/Message/i) as HTMLTextAreaElement;

    // Check initial state (should be required, and valueMissing true since they are empty)
    expect(nameInput.required).toBe(true);
    expect(nameInput.validity.valueMissing).toBe(true);

    expect(emailInput.required).toBe(true);
    expect(emailInput.validity.valueMissing).toBe(true);

    expect(messageTextarea.required).toBe(true);
    expect(messageTextarea.validity.valueMissing).toBe(true);

    // Test invalid email
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(emailInput, { target: { value: "not-an-email" } });
    fireEvent.change(messageTextarea, { target: { value: "Hello" } });

    expect(nameInput.validity.valueMissing).toBe(false);
    expect(emailInput.validity.typeMismatch).toBe(true);
  });
});
