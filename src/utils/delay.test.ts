import delay from "./delay";

describe("delay", () => {
  it("should call the function after the specified wait time", done => {
    const func = jest.fn();
    const waitTime = 100;

    delay(func, waitTime);

    setTimeout(() => {
      expect(func).toHaveBeenCalled();
      done();
    }, waitTime + 50); // Adding a little buffer time to ensure the function gets called
  });

  it("should pass the arguments to the function", done => {
    const func = jest.fn();
    const waitTime = 100;
    const arg1 = "hello";
    const arg2 = "world";

    delay(func, waitTime, arg1, arg2);

    setTimeout(() => {
      expect(func).toHaveBeenCalledWith(arg1, arg2);
      done();
    }, waitTime + 50);
  });

  it("should return a timer ID", () => {
    const func = jest.fn();
    const waitTime = 100;

    const timerId = delay(func, waitTime);
    expect(typeof timerId).toBe("number");
    clearTimeout(timerId); // Clean up the timer
  });
});
