"use client";

import {
  Component,
  ErrorInfo,
  PropsWithChildren,
  PropsWithRef,
  ReactNode,
} from "react";

import { areArraysDiffrent } from "@/utils";

export type ErrorFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: () => void;
};

type RenderFallbackType = <ErrorType extends Error>(
  props: ErrorFallbackProps<ErrorType>,
) => ReactNode;
type IgnoreErrorType = <ErrorType extends Error = Error>(
  error: ErrorType,
) => boolean;

export type ErrorBoundaryProps<ErrorType extends Error = Error> = {
  resetKeys?: unknown[];
  onReset?(): void;
  errorFallback: RenderFallbackType;
  onError?(error: ErrorType, info: ErrorInfo): void;
  ignoreError?: IgnoreErrorType;
};

interface State<ErrorType extends Error = Error> {
  error: ErrorType | null;
}

const initialState: State = {
  error: null,
};

export class ErrorBoundary extends Component<
  PropsWithRef<PropsWithChildren<ErrorBoundaryProps>>,
  State
> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { onError, ignoreError } = this.props;

    if (ignoreError?.(error)) {
      throw error;
    }

    onError?.(error, info);
  }

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState(initialState);
  };

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.error == null) {
      return;
    }

    if (areArraysDiffrent(prevProps.resetKeys, this.props.resetKeys)) {
      this.resetErrorBoundary();
    }
  }

  render() {
    const { children, errorFallback } = this.props;
    const { error } = this.state;

    if (error != null) {
      return errorFallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }

    return children;
  }
}
