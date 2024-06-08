import Image from "next/image";
import Link from "next/link";
import { cva } from "class-variance-authority";

import { AsyncState } from "@/types";
import { cn } from "@/utils";

import { Fallback } from "./Fallback";

type SearchedUserListProps = {
  userList: {
    login: string;
    avatar_url: string;
  }[];
  aysncState: AsyncState;
  size: "sm" | "lg";
};

export const SearchedUserList = ({
  userList,
  aysncState,
  size = "lg",
}: SearchedUserListProps) => {
  if (aysncState !== "SUCCESS") {
    return <Fallback aysncState={aysncState} />;
  }

  return (
    <ul className="pt-2 h-full">
      {userList.map(user => (
        <li key={user.login}>
          <Link
            href={`/${user.login}`}
            passHref={true}
            className="
                flex items-center py-1 px-4 hover:bg-blue-50 
                cursor-pointer gap-3
               "
          >
            <Image
              src={user.avatar_url}
              alt={user.login}
              width={TYPE_IMAGE_SIZE[size]}
              height={TYPE_IMAGE_SIZE[size]}
              placeholder="empty"
              className="
                  rounded-full outline-1 outline
                  bg-blue-100  outline-blue-100
                "
            />
            <span className={cn(TextVariants({ size }))}>{user.login}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const TYPE_IMAGE_SIZE = {
  sm: 20,
  lg: 24,
};

const TextVariants = cva(``, {
  variants: {
    size: {
      sm: "text-[15px]",
      lg: "text-[16px",
    },
  },
});
