"use client";

import { cva } from "class-variance-authority";
import { ClassValue } from "clsx";

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
      <div className="absolute top-[-6px] w-full h-4 bg-white z-10"></div>
      <hr className="relative mx-4 h-[1px] bg-blue-100 z-20" />
      <SearchedUserList
        userList={searchedUsers}
        aysncState={resultState}
        size={size}
      />
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
