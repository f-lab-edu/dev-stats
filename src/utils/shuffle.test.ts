import shuffle from "./shuffle";

describe("shuffle", () => {
  it("shuffles the array", () => {
    const array = [1, 2, 3, 4];
    const shuffled = shuffle(array);
    expect(shuffled).not.toEqual(array);
  });

  it("returns a new array", () => {
    const array = [1, 2, 3, 4];
    const shuffled = shuffle(array);
    expect(shuffled).not.toBe(array);
  });

  it("returns an empty array when the input array is empty", () => {
    expect(shuffle([])).toEqual([]);
  });
});
