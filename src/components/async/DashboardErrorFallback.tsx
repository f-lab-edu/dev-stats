"use client";

import { HTMLAttributes } from "react";

import { ErrorFallbackProps } from "./ErrorBoundary";

type DashboardErrorFallbackProps = HTMLAttributes<HTMLElement> &
  ErrorFallbackProps;

export const DashboardErrorFallback = ({
  error,
}: DashboardErrorFallbackProps) => {
  return (
    <div className="full-size flex-row-center">
      <p>{error.message}</p>
    </div>
  );
};
