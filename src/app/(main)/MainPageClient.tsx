"use client";

import { useRef } from "react";

import { cn } from "@/utils";
import { useSearchUser } from "@/hooks";

import { SearchBar, SearchPanel } from "@/components";

const SEARCH_BAR_MAX_WIDTH_CLASS_NAME = "max-w-[500px]";

const MainPageClient = () => {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const { searchQuery, handleSearchButtonClick, handleSearchQueryChange } =
    useSearchUser();

  const containerRadiusClassName =
    searchQuery.length < 3 ? "" : "rounded-bl-none rounded-br-none";

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-10 pb-40 px-5">
      <h1 className="text-6xl font-semibold text-blue-500">devstats</h1>
      <div className="relative flex flex-col items-center w-full">
        <SearchBar
          ref={searchBarRef}
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onSearch={handleSearchButtonClick}
          onReset={() => searchBarRef.current?.focus()}
          containerClassName={cn([
            containerRadiusClassName,
            SEARCH_BAR_MAX_WIDTH_CLASS_NAME,
          ])}
        />
        <SearchPanel
          isVisible={searchQuery.length > 2}
          searchQuery={searchQuery}
          className={SEARCH_BAR_MAX_WIDTH_CLASS_NAME}
        />
      </div>
    </div>
  );
};

export default MainPageClient;
