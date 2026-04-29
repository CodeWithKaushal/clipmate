import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("filters falsy values", () => {
    const includeHidden = false;
    expect(cn("base", includeHidden && "hidden", "block")).toBe("base block");
  });
});
