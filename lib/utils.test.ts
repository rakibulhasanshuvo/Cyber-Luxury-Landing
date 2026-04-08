import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  it("should handle conditional classes", () => {
    expect(cn("text-red-500", { "bg-blue-500": true, "hidden": false })).toBe(
      "text-red-500 bg-blue-500"
    );
  });

  it("should handle falsy values", () => {
    expect(cn("text-red-500", null, undefined, false, "")).toBe("text-red-500");
  });

  it("should handle nested arrays", () => {
    expect(cn(["text-red-500", ["bg-blue-500", "font-bold"]])).toBe(
      "text-red-500 bg-blue-500 font-bold"
    );
  });

  it("should merge tailwind classes and resolve conflicts", () => {
    // tailwind-merge should resolve px-2 and px-4 to px-4
    expect(cn("px-2 py-2", "px-4")).toBe("py-2 px-4");

    // should handle more complex conflicts
    expect(cn("text-red-500 text-blue-500")).toBe("text-blue-500");
  });

  it("should return an empty string when no arguments are provided", () => {
    expect(cn()).toBe("");
  });

  it("should handle numbers", () => {
    expect(cn(1, 2, 3)).toBe("1 2 3");
  });

  it("should handle deeply nested arrays", () => {
    expect(cn([[[["text-red-500", [["bg-blue-500"]]]]]])).toBe("text-red-500 bg-blue-500");
  });

  it("should handle functions", () => {
    // clsx ignores standalone functions but evaluates them as truthy in objects
    const fn = () => "test";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(cn(fn as any)).toBe("");
    expect(cn({ "bg-red-500": fn })).toBe("bg-red-500");
  });
});
