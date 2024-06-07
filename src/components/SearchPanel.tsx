"use client";

import { cva } from "class-variance-authority";
import { ClassValue } from "clsx";
scrollBy;

import { useSearchUserQuery } from "@/hooks";
import { cn } from "@/utils";

import { SearchedUserList } from "./UserList";

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
  const { searchedUsers, resultState } = useSearchUserQuery(searchQuery);

  if (!isVisible) return null;

  return (
    <div className={cn([ContainerVariants({ size }), className])} {...props}>
      <hr className="mx-4 bg-blue-200" />
      <SearchedUserList userList={searchedUsers} aysncState={resultState} />
    </div>
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
