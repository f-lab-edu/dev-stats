import { AsyncState } from "@/types";
import { LoadingSpinner } from "./LoadingSpinner";

type FallbackProps = {
  aysncState: AsyncState;
};

export const Fallback = ({ aysncState }: FallbackProps) => {
  const FALLBACK: {
    [key in AsyncState]?: JSX.Element | string;
  } = {
    LOADING: <LoadingSpinner />,
    NO_RESULT: <p>No results found</p>,
    ERROR: <p>An error occurred</p>,
  };

  return (
    <div className="flex-row-center full-size">{FALLBACK[aysncState]}</div>
  );
};
