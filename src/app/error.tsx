"use client";

import { useEffect } from "react";
import Image from "next/image";

import { Title } from "@/components";

export default function Error({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="
       h-screen w-full flex-col-center gap-2
      "
      role="alert"
      aria-live="assertive"
    >
      <Image src={"/warn.svg"} alt="warn" width={80} height={80} />
      <div className="flex-col-center gap-4">
        <Title
          className="text-2xl text-blue-900"
          aria-label="Error : Something went wrong!"
        >
          Something went wrong!
        </Title>
        {reset && (
          <button
            onClick={() => reset?.()}
            className="underline"
            role="button"
            aria-label="Try again"
            tabIndex={0}
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
