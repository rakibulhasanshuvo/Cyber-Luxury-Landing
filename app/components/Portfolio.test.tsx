/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Portfolio, { projects } from "./Portfolio";
import { describe, test, expect, vi } from "vitest";
import type { ComponentPropsWithoutRef } from "react";

// Mock framer-motion to avoid animation-related issues during testing
vi.mock("framer-motion", () => {
  return {
    motion: {
      div: ({ children, ...props }: ComponentPropsWithoutRef<"div"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown; style?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, style, ...rest } = props;
        return <div {...rest}>{children}</div>;
      },
      h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown; style?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, style, ...rest } = props;
        return <h2 {...rest}>{children}</h2>;
      },
      p: ({ children, ...props }: ComponentPropsWithoutRef<"p"> & { initial?: unknown; animate?: unknown; transition?: unknown; whileInView?: unknown; viewport?: unknown; style?: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, style, ...rest } = props;
        return <p {...rest}>{children}</p>;
      },
    },
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
  };
});

// Mock lucide-react to avoid icon rendering issues
vi.mock("lucide-react", () => ({
  Github: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="github-icon" {...props} />
  ),
  ExternalLink: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="external-link-icon" {...props} />
  ),
  Sparkles: (props: React.ComponentPropsWithoutRef<"svg">) => (
    <svg data-testid="sparkles-icon" {...props} />
  ),
}));

// Mock next/image to avoid optimization-related issues
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentPropsWithoutRef<"img"> & { fill?: boolean }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

describe("Portfolio Component Rendering", () => {
  test("renders the section heading and description", () => {
    const { unmount } = render(<Portfolio />);

    expect(screen.getByText("Creative Portfolio")).toBeDefined();
    expect(screen.getByText("Featured")).toBeDefined();
    expect(screen.getByText("Experiences")).toBeDefined();
    expect(screen.getByText(/A collection of digital products built at the intersection/i)).toBeDefined();

    unmount();
  });

  test("renders all projects from the projects array", () => {
    const { unmount } = render(<Portfolio />);

    projects.forEach(project => {
      // Check that title and description exist
      expect(screen.getByText(project.title)).toBeDefined();
      expect(screen.getByText(project.desc)).toBeDefined();

      // Check tags
      project.tags.forEach(tag => {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      });

      // Check that image is rendered
      const image = screen.getByAltText(project.title);
      expect(image).toBeDefined();

      // Check codebase/live preview links are correct
      const githubLink = screen.getAllByRole('link', { name: /Codebase/i }).find(el => el.getAttribute('href') === project.github);
      expect(githubLink).toBeDefined();

      const liveLink = screen.getAllByRole('link', { name: /Live Preview/i }).find(el => el.getAttribute('href') === project.link);
      expect(liveLink).toBeDefined();
    });

    unmount();
  });

  test("renders the correct number of project icons", () => {
    const { unmount } = render(<Portfolio />);

    // Each project has one GitHub and one ExternalLink icon
    // The main section has one Sparkles icon
    const githubIcons = screen.getAllByTestId("github-icon");
    const externalLinkIcons = screen.getAllByTestId("external-link-icon");
    const sparklesIcons = screen.getAllByTestId("sparkles-icon");

    expect(githubIcons.length).toBe(projects.length);
    expect(externalLinkIcons.length).toBe(projects.length);
    expect(sparklesIcons.length).toBe(1);

    unmount();
  });
});
