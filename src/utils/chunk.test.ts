import { chunk } from "./chunk";

describe("chunk", () => {
  it("should return an empty array when the input array is empty", () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it("should return an array with a single chunk when the input array length is less than the chunk size", () => {
    expect(chunk([1], 2)).toEqual([[1]]);
  });

  it("should return an array with a single chunk when the input array length is equal to the chunk size", () => {
    expect(chunk([1, 2], 2)).toEqual([[1, 2]]);
  });

  it("should return an array with multiple chunks when the input array length is greater than the chunk size", () => {
    expect(chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]]);
  });

  it("should return an array with multiple chunks when the input array length is not divisible by the chunk size", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("should return an array with multiple chunks when the input array length is not divisible by the chunk size", () => {
    expect(chunk([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]]);
  });

  it("should return an array with a single chunk when the chunk size is larger than the input array length", () => {
    expect(chunk([1, 2, 3, 4], 5)).toEqual([[1, 2, 3, 4]]);
  });

  it("should return an empty array when the chunk size is 0 or negative", () => {
    expect(chunk([1, 2, 3, 4], 0)).toEqual([]);
    expect(chunk([1, 2, 3, 4], -1)).toEqual([]);
  });

  it("should throw an error when the size is not an integer", () => {
    const invalidSizes = [0.5, Infinity, -Infinity, NaN];
    invalidSizes.forEach(size => {
      expect(() => chunk([1, 2, 3, 4], size)).toThrow(Error);
    });
  });

  // Additional test case for non-default size
  it("should return the original array when the chunk size is 1", () => {
    expect(chunk([1, 2, 3, 4], 1)).toEqual([[1], [2], [3], [4]]);
  });
});
