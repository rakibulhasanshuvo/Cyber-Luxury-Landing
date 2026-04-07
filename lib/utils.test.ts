import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("should merge basic string class names correctly", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  it("should handle conditional classes in objects", () => {
    expect(cn("text-red-500", { "bg-blue-500": true, "hidden": false })).toBe(
      "text-red-500 bg-blue-500"
    );
    // tailwind-merge resolves 'block' and 'hidden' as conflicting display utilities
    expect(cn({ "block": true, "hidden": true })).toBe("hidden");
  });

  it("should handle and ignore falsy values", () => {
    expect(cn("text-red-500", null, undefined, false, "", 0, NaN)).toBe("text-red-500");
  });

  it("should handle arrays and nested arrays of mixed types", () => {
    expect(cn(["text-red-500", ["bg-blue-500", "font-bold"]])).toBe(
      "text-red-500 bg-blue-500 font-bold"
    );
    expect(cn(["text-red-500", null, false, ["bg-blue-500", { "hidden": true }]])).toBe(
      "text-red-500 bg-blue-500 hidden"
    );
  });

  it("should merge tailwind classes and resolve simple conflicts", () => {
    // tailwind-merge should resolve px-2 and px-4 to px-4
    expect(cn("px-2 py-2", "px-4")).toBe("py-2 px-4");

    // should handle more complex conflicts
    expect(cn("text-red-500 text-blue-500")).toBe("text-blue-500");
  });

  it("should merge tailwind classes with modifiers correctly", () => {
    // hover modifier resolution
    expect(cn("hover:text-red-500 hover:text-blue-500")).toBe("hover:text-blue-500");
    // mixed modifiers
    expect(cn("text-red-500 hover:text-blue-500 focus:text-green-500")).toBe(
      "text-red-500 hover:text-blue-500 focus:text-green-500"
    );
  });

  it("should handle complex permutations of all supported inputs", () => {
    expect(cn(
      "p-4",
      { "m-4": true, "m-2": false },
      ["text-red-500", "bg-blue-500"],
      null,
      undefined,
      false,
      "p-2 text-green-500" // Should override p-4 and text-red-500
    )).toBe("m-4 bg-blue-500 p-2 text-green-500");
  });

  it("should return an empty string when no arguments are provided", () => {
    expect(cn()).toBe("");
  });
});
