import Link from "next/link";

import { Title } from "@/components";

type UserNotFoundProps = {
  username: string;
};

export default function UserNotFound({ username }: UserNotFoundProps) {
  return (
    <div
      className="
        w-full flex-col-center gap-4 absolute-center
      "
      role="alert"
      aria-live="assertive"
    >
      <Title
        className="text-2xl text-blue-900 flex flex-col text-center"
        aria-label="Error : No User Found!"
      >
        No User Found
        <span className="text-base">({username})</span>
      </Title>
      <Link href="/" className="underline" role="button" tabIndex={0}>
        Go back home
      </Link>
    </div>
  );
}
