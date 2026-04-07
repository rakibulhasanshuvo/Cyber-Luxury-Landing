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

  it("should handle arbitrary values correctly", () => {
    expect(cn("w-[10px]", "w-[20px]")).toBe("w-[20px]");
    expect(cn("text-[#123456]", "text-[#654321]")).toBe("text-[#654321]");
  });

  it("should handle pseudo-class modifiers correctly", () => {
    expect(cn("hover:text-red-500", "hover:text-blue-500")).toBe("hover:text-blue-500");
    expect(cn("focus:px-2", "focus:p-4")).toBe("focus:p-4");
  });

  it("should handle empty objects and arrays gracefully", () => {
    expect(cn({}, [])).toBe("");
    expect(cn("text-red-500", {}, [], [""])).toBe("text-red-500");
  });
});
