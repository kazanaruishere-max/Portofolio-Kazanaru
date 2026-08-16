import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges truthy class names", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("ignores falsy values", () => {
    expect(cn("a", false, undefined, null, 0, "b")).toBe("a b");
  });

  it("returns empty string when no valid classes", () => {
    expect(cn()).toBe("");
    expect(cn(false, undefined, null)).toBe("");
  });

  it("dedupes conflicting Tailwind classes (tailwind-merge)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("bg-black", "bg-white")).toBe("bg-white");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("keeps distinct non-conflicting classes", () => {
    expect(cn("flex", "items-center", "justify-between")).toBe(
      "flex items-center justify-between"
    );
  });

  it("handles conditional object/array inputs", () => {
    expect(cn({ "a-b": true, "a-c": false })).toBe("a-b");
    expect(cn(["x", "y"], { z: true })).toBe("x y z");
  });
});
