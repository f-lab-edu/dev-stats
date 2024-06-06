import { cn } from "@/utils";

describe("cn function", () => {
  it("ignores falsy values and combines class names", () => {
    const result = cn("btn", "", false, null, undefined, "btn-primary");
    expect(result).toBe("btn btn-primary");
  });

  it("handles conditional class names", () => {
    const condition = true;
    const result = cn(
      "btn",
      condition && "btn-primary",
      !condition && "btn-secondary",
    );
    expect(result).toBe("btn btn-primary");
  });

  it("merges Tailwind utility classes correctly", () => {
    const result = cn("text-center", "mx-4", "mx-8");
    expect(result).toBe("text-center mx-8");
  });

  it("handles array and object input formats", () => {
    const result = cn(["btn", "btn-primary"], {
      "is-active": true,
      "is-disabled": false,
    });
    expect(result).toBe("btn btn-primary is-active");
  });
});
