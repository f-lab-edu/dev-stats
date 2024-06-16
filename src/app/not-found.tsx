import Link from "next/link";

import { Title } from "@/components";

export default function NotFound() {
  return (
    <div
      className="
        h-screen w-full flex flex-col items-center 
        justify-center gap-3
      "
      role="alert"
      aria-live="assertive"
    >
      <Title
        className="text-lg text-blue-900"
        aria-label="Error 404: Page Not Found"
      >
        404 - Page Not Found
      </Title>
      <Link href="/" className="underline" role="button" tabIndex={0}>
        Go back home
      </Link>
    </div>
  );
}
