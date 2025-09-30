import Link from "next/link";

import { Title } from "@/components";
import { useTranslations } from "next-intl";

type UserNotFoundProps = {
  username: string;
};

export default function UserNotFound({ username }: UserNotFoundProps) {
  const t = useTranslations("search");

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
        {t("user_not_found")}
        <span className="text-base">({username})</span>
      </Title>
      <Link href="/" className="underline" role="button" tabIndex={0}>
        {t("go_back_home")}
      </Link>
    </div>
  );
}
