import { debounce } from "@/utils";

describe("debounce function", () => {
  jest.useFakeTimers();

  it("delays the function execution", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("calls the function only once within the timeout period", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("passes the correct arguments to the debounced function", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);
    const arg1 = 10;
    const arg2 = "test";

    debouncedFn(arg1, arg2);
    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
  });
});
