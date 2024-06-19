import { ErrorBoundary, ErrorFallbackProps } from "@/components";
import { render, screen } from "@testing-library/react";
import { useEffect } from "react";

const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  console.error(error);
  return (
    <div>
      <h1>Error</h1>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

const ChildrenComponentWithoutError = () => <div>Children</div>;

const ChildrenComponentWithError = () => {
  useEffect(() => {
    throw new Error("Error");
  }, []);

  return <div>Children</div>;
};

describe("ErrorBoundary", () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it("should render children if there is no error", () => {
    const { getByText } = render(
      <ErrorBoundary errorFallback={ErrorFallback}>
        <ChildrenComponentWithoutError />
      </ErrorBoundary>,
    );

    expect(getByText("Children")).toBeInTheDocument();
  });

  it("should render error fallback if there is an error", () => {
    const { getByText } = render(
      <ErrorBoundary errorFallback={ErrorFallback}>
        <ChildrenComponentWithError />
      </ErrorBoundary>,
    );

    expect(getByText("Error")).toBeInTheDocument();
  });

  it("should call ignoreError and rethrow the error if ignoreError returns true", () => {
    const ignoreErrorMock = jest.fn().mockReturnValue(true);
    const onErrorMock = jest.fn();

    expect(() => {
      render(
        <ErrorBoundary
          errorFallback={ErrorFallback}
          onError={onErrorMock}
          ignoreError={ignoreErrorMock}
        >
          <ChildrenComponentWithError />
        </ErrorBoundary>,
      );
    }).toThrow("Error");

    expect(ignoreErrorMock).toHaveBeenCalled();
    expect(onErrorMock).not.toHaveBeenCalled();
  });

  it("should call onError if ignoreError returns false", () => {
    const ignoreErrorMock = jest.fn().mockReturnValue(false);
    const onErrorMock = jest.fn();

    render(
      <ErrorBoundary
        errorFallback={ErrorFallback}
        onError={onErrorMock}
        ignoreError={ignoreErrorMock}
      >
        <ChildrenComponentWithError />
      </ErrorBoundary>,
    );

    expect(ignoreErrorMock).toHaveBeenCalled();
    expect(onErrorMock).toHaveBeenCalled();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
