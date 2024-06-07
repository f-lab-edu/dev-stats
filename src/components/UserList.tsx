import Image from "next/image";
import Link from "next/link";

import { FallbackState } from "@/types";

import { Fallback } from "./Fallback";

type SearchedUserListProps = {
  userList: {
    login: string;
    avatar_url: string;
  }[];
  state?: FallbackState;
};

export const SearchedUserList = ({
  userList,
  state,
}: SearchedUserListProps) => {
  if (state) {
    return <Fallback state={state} />;
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
              width={24}
              height={24}
              placeholder="empty"
              className="
                  rounded-full outline-1 outline
                  bg-blue-100  outline-blue-100
                "
            />
            {user.login}
          </Link>
        </li>
      ))}
    </ul>
  );
};
