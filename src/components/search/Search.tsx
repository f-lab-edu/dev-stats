"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { cn, debounce } from "@/utils";

import { SearchBar } from "./SearchBar";
import { SearchPanel } from "./SearchPanel";

const TIME_OUT = 300;

type SearchProps = {
  size?: "sm" | "lg";
};

export const Search = ({ size = "sm" }: SearchProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setDebouncedQuery(query);
      }, TIME_OUT),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(e.target.value);
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
      {searchQuery.length > 2 && (
        <SearchPanel
          size={size}
          searchQuery={debouncedQuery}
          className={maxWidthClassName[size]}
        />
      )}
    </>
  );
};
