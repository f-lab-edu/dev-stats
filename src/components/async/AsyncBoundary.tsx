import { Suspense, SuspenseProps } from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "./ErrorBoundary";
import { DashboardErrorFallback } from "./DashboardErrorFallback";
import { Fallback } from "./Fallback";

type AsyncBoundaryProps = {
  children: React.ReactNode;
  loadingFallback?: SuspenseProps["fallback"];
  errorFallback?: ErrorBoundaryProps["errorFallback"];
} & Omit<ErrorBoundaryProps, "errorFallback">;

export const AsyncBoundary = ({
  children,
  onError,
  onReset,
  ignoreError,
  resetKeys,
  errorFallback = DashboardErrorFallback,
  loadingFallback = <Fallback aysncState="LOADING" />,
}: AsyncBoundaryProps) => {
  return (
    <ErrorBoundary
      errorFallback={errorFallback}
      onError={onError}
      onReset={onReset}
      ignoreError={ignoreError}
      resetKeys={resetKeys}
    >
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};
