import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Fallback } from "@/components/async/Fallback";

describe("Fallback Component", () => {
  it("renders LoadingSpinner when asyncState is LOADING", () => {
    render(<Fallback aysncState="LOADING" />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it('renders "No results found" message when asyncState is NO_RESULT', () => {
    render(<Fallback aysncState="NO_RESULT" />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it('renders "An error occurred" message when asyncState is ERROR', () => {
    render(<Fallback aysncState="ERROR" />);
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  it("renders nothing when asyncState is SUCCESS", () => {
    const { container } = render(<Fallback aysncState="SUCCESS" />);
    expect(container.firstChild).toBeNull();
  });
});
