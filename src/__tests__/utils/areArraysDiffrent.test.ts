import { areArraysDiffrent } from "@/utils";

describe("areArraysDiffrent", () => {
  it("should return true if arrays are different", () => {
    expect(areArraysDiffrent([1, 2], [2, 3])).toBe(true);
    expect(areArraysDiffrent([1, 2], [2, 1])).toBe(true);
  });

  it("should return false if arrays are same", () => {
    expect(areArraysDiffrent([1, 2], [1, 2])).toBe(false);
    expect(areArraysDiffrent([], [])).toBe(false);
  });

  it("should return true if arrays are different in length", () => {
    expect(areArraysDiffrent([1, 2], [1, 2, 3])).toBe(true);
    expect(areArraysDiffrent([1, 2], [1])).toBe(true);
  });

  it("should return true if arrays are different in type", () => {
    expect(areArraysDiffrent([1, 2], ["1", 2])).toBe(true);
    expect(areArraysDiffrent([1, 2], [1, "2"])).toBe(true);
  });

  it("should return true if arrays are different in order", () => {
    expect(areArraysDiffrent([1, 2], [2, 1])).toBe(true);
    expect(areArraysDiffrent([1, 2, 3], [3, 2, 1])).toBe(true);
  });
});
