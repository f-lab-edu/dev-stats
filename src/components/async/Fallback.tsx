import { AsyncState } from "@/types";
import { LoadingSpinner } from "./LoadingSpinner";
import { useTranslations } from "next-intl";

type FallbackProps = {
  aysncState: AsyncState;
};

export const Fallback = ({ aysncState }: FallbackProps) => {
  const t = useTranslations("search");

  const FALLBACK: {
    [key in AsyncState]?: JSX.Element | string;
  } = {
    LOADING: <LoadingSpinner />,
    NO_RESULT: <p>{t("no_result")}</p>,
    ERROR: <p>{t("error")}</p>,
  };

  if (aysncState === "SUCCESS") return null;

  return (
    <div className="flex-row-center full-size">{FALLBACK[aysncState]}</div>
  );
};
