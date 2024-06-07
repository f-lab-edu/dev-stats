import { LoadingSpinner } from "./LoadingSpinner";

type FallbackProps = {
  state: "PENDING" | "NO_RESULT" | "ERROR";
};

export const Fallback = ({ state }: FallbackProps) => {
  const FALLBACK = {
    PENDING: <LoadingSpinner />,
    NO_RESULT: "No results found",
    ERROR: "An error occurred",
  };

  return <div className="flex-row-center full-size">{FALLBACK[state]}</div>;
};
