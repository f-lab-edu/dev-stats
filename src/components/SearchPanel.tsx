"use client";

import { cva } from "class-variance-authority";
import { ClassValue } from "clsx";
import Image from "next/image";
import Link from "next/link";

import { useSearchUserQuery } from "@/hooks";
import { cn } from "@/utils";

import { LoadingSpinner } from "./LoadingSpinner";

type SearchPanelProps = {
  isVisible?: boolean;
  searchQuery: string;
  size?: "sm" | "lg";
  className?: ClassValue;
} & Omit<React.HTMLProps<HTMLDivElement>, "size">;

export const SearchPanel = ({
  isVisible = true,
  searchQuery,
  size = "lg",
  className,
  ...props
}: SearchPanelProps) => {
  if (!isVisible) return null;

  return (
    <div className={cn([ContainerVariants({ size }), className])} {...props}>
      <hr className="mx-4 bg-blue-200" />
      <SearchedUserList searchQuery={searchQuery} />
    </div>
  );
};

type SearchedUserListProps = {
  searchQuery: string;
};

const SearchedUserList = ({ searchQuery }: SearchedUserListProps) => {
  const { searchedUsers, isInitialPending, isNoResult } =
    useSearchUserQuery(searchQuery);

  if (isInitialPending) {
    return <Fallback state="PENDING" />;
  }

  if (isNoResult) {
    return <Fallback state="NO_RESULT" />;
  }

  return (
    <ul className="pt-2 h-full">
      {searchedUsers.map(user => (
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

type FallbackProps = {
  state: "PENDING" | "NO_RESULT";
};

const Fallback = ({ state }: FallbackProps) => {
  const FALLBACK = {
    PENDING: <LoadingSpinner />,
    NO_RESULT: "No results found",
  };

  return <div className="flex-row-center full-size">{FALLBACK[state]}</div>;
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
