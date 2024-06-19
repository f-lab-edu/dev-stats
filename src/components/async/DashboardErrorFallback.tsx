"use client";

import { ErrorFallbackProps } from "./ErrorBoundary";

export const DashboardErrorFallback = ({ error }: ErrorFallbackProps) => {
  return (
    <div className="full-size flex-row-center">
      <p>{error.message}</p>
    </div>
  );
};
