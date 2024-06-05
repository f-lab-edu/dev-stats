import { useCallback, useEffect, useState, useTransition } from "react";

import { getUsersBySearchQuery } from "@/apis";
import { debounce } from "@/utils";
import { SearchedUser } from "@/types";

export const useSearchUserQuery = (searchQuery: string) => {
  const [isPending, startTransition] = useTransition();
  const [searchResult, setSearchResult] = useState<SearchedUser[]>([]);
  const [isNoResult, setIsNoResult] = useState(false);

  const isSearchResultExist = searchResult.length > 0;
  const isInitialPending =
    searchQuery.length > 2 && !isNoResult && searchResult.length === 0;

  const searchUser = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSearchResult([]);
      return;
    }

    const response = await getUsersBySearchQuery(searchQuery);

    if (response.total_count === 0) {
      setIsNoResult(true);
      setSearchResult([]);
      return;
    }

    setIsNoResult(false);
    startTransition(() => {
      setSearchResult(response.items.slice(0, 5));
    });
  };

  const debouncedSearchUser = useCallback(debounce(searchUser, 300), []);

  useEffect(() => {
    debouncedSearchUser(searchQuery);
  }, [searchQuery, debouncedSearchUser]);

  return {
    isPending,
    searchedUsers: searchResult,
    isSearchResultExist,
    isInitialPending,
    isNoResult,
  };
};
