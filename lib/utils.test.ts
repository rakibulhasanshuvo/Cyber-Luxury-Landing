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

  it("should handle numbers as class names", () => {
    expect(cn(1, 2, "p-4")).toBe("1 2 p-4");
    expect(cn({ "1": true, "2": false })).toBe("1");
  });

  it("should ignore bigints as they are not supported by clsx", () => {
    // @ts-expect-error - BigInts are in the typedef but ignored by clsx implementation
    expect(cn(1n, 2n, "p-4")).toBe("p-4");
  });

  it("should handle deeply nested arrays", () => {
    expect(cn(["text-red-500", [["bg-blue-500"], [["font-bold"]]]])).toBe(
      "text-red-500 bg-blue-500 font-bold"
    );
  });

  it("should handle objects with truthy/falsy values including functions", () => {
    // Functions are truthy in JS, so clsx includes the key
    expect(
      cn({
        "text-red-500": () => true,
        "bg-blue-500": () => false,
      } as any)
    ).toBe("text-red-500 bg-blue-500");
  });

  it("should ignore boolean arguments directly, but apply them as string keys when in an object", () => {
    // direct boolean arguments are ignored
    expect(cn(true, false, "p-4")).toBe("p-4");
    // in an object, true resolves to 'true' string key
    expect(cn({ "true": true, "false": false })).toBe("true");
  });

  it("should ignore functions passed as direct arguments", () => {
    expect(cn((() => "hello") as any, "p-4")).toBe("p-4");
  });
});
