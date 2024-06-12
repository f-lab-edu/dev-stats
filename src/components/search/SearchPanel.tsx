"use client";

import { cva } from "class-variance-authority";
import { ClassValue } from "clsx";

import { useSearchUserQuery } from "@/hooks";
import { cn } from "@/utils";

import { SearchedUserList } from "./UserList";
import { Fallback } from "../async";

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
  const { searchedUsers, isLoading, isError } = useSearchUserQuery(searchQuery);
  const resultState = getAsyncState();

  function getAsyncState() {
    const isNoResult = searchedUsers !== null && searchedUsers.length === 0;

    if (isError) return "ERROR";
    if (isLoading) return "LOADING";
    if (isNoResult) return "NO_RESULT";
    return "SUCCESS";
  }

  return (
    <div className={cn([ContainerVariants({ size }), className])} {...props}>
      <div className={cn(ShadowCoverVariants({ size }))} />
      <hr className="relative mx-4 h-[1px]x bg-blue-100 z-20" />
      {searchedUsers && searchedUsers.length > 0 ? (
        <SearchedUserList userList={searchedUsers} size={size} />
      ) : (
        <Fallback aysncState={resultState} />
      )}
    </div>
  );
};

const ContainerVariants = cva(
  `absolute bg-white pb-4
  w-full gap-3 items-center z-10
  shadow-out`,
  {
    variants: {
      size: {
        sm: "top-9 rounded-b-[18px] h-[178px]",
        lg: "top-12 rounded-b-[24px] h-[185px]",
      },
    },
  },
);

const ShadowCoverVariants = cva(`absolute w-full h-4 bg-white`, {
  variants: {
    size: {
      sm: "top-[-4px]",
      lg: "top-[-6px]",
    },
  },
});
