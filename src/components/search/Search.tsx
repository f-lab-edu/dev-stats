"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/utils";

import { SearchBar } from "./SearchBar";
import { SearchPanel } from "./SearchPanel";

type SearchProps = {
  size?: "sm" | "lg";
};

export const Search = ({ size = "sm" }: SearchProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.length > 0) {
      router.push(`/${searchQuery}`);
    }
  };

  const containerRadiusClassName =
    searchQuery.length < 3
      ? ""
      : "rounded-bl-none rounded-br-none border-transparent shadow-out";

  const maxWidthClassName = {
    sm: "max-w-[400px]",
    lg: "max-w-[500px]",
  };

  return (
    <>
      <SearchBar
        size={size}
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onSearch={handleSearchButtonClick}
        containerClassName={cn([
          containerRadiusClassName,
          maxWidthClassName[size],
        ])}
      />
      <SearchPanel
        size={size}
        isVisible={searchQuery.length > 2}
        searchQuery={searchQuery}
        className={maxWidthClassName[size]}
      />
    </>
  );
};
