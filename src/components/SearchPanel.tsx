"use client";

import { cva } from "class-variance-authority";
import { ClassValue } from "clsx";
import Image from "next/image";
import Link from "next/link";

import { useSearchUserQuery } from "@/hooks";
import { SearchedUser } from "@/types";
import { cn } from "@/utils";

import { LoadingSpinner } from "./LoadingSpinner";

type SearchPanelProps = {
  searchQuery: string;
  size?: "sm" | "lg";
  className?: ClassValue;
} & Omit<React.HTMLProps<HTMLDivElement>, "size">;

export const SearchPanel = ({
  searchQuery,
  size = "lg",
  className,
  ...props
}: SearchPanelProps) => {
  const { searchedUsers, isInitialPending, isNoResult } =
    useSearchUserQuery(searchQuery);

  const getChildrenByState = () => {
    if (isInitialPending) {
      return (
        <li className="flex items-center justify-center w-full h-full">
          <LoadingSpinner />
        </li>
      );
    }

    if (isNoResult) {
      return (
        <li className="flex items-center justify-center w-full h-full">
          No results found
        </li>
      );
    }

    return searchedUsers.map(e => {
      return <SearchedUserListItem key={e.login} user={e} />;
    });
  };

  if (searchQuery.length < 3) return null;
  return (
    <div className={cn([ContainerVariants({ size }), className])} {...props}>
      <hr className="mx-4 bg-blue-200" />
      <ul className="pt-2 h-full">{getChildrenByState()}</ul>
    </div>
  );
};

type SearchedUserListItemProps = {
  user: SearchedUser;
};

const SearchedUserListItem = ({ user }: SearchedUserListItemProps) => {
  return (
    <li>
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
        rounded-full outline-1 outline outline-blue-100
        bg-blue-100
        "
        />
        {user.login}
      </Link>
    </li>
  );
};

const ContainerVariants = cva(
  `absolute bg-white pb-4
  w-full gap-3 items-center z-10
  shadow-md`,
  {
    variants: {
      size: {
        sm: "top-9 rounded-t-[18px]",
        lg: "top-12 rounded-b-[24px] h-[185px]",
      },
    },
  },
);
