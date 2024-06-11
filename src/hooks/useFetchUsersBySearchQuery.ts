import { useCallback, useEffect, useState, useTransition } from "react";

import { getUsersBySearchQuery } from "@/apis";
import { debounce } from "@/utils";
import { SearchedUser } from "@/types";

export const useSearchUserQuery = (searchQuery: string) => {
  const [isPending, startTransition] = useTransition();
  const [searchResult, setSearchResult] = useState<SearchedUser[] | null>(null);
  const [error, setError] = useState<unknown>(null);

  const searchUser = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSearchResult(null);
      return;
    }

    try {
      const response = await getUsersBySearchQuery(searchQuery);

      startTransition(() => {
        setSearchResult(response.items.slice(0, 5));
      });
    } catch (error: unknown) {
      setError(error);
      return;
    }
  };

  const debouncedSearchUser = useCallback(debounce(searchUser, 300), []);

  useEffect(() => {
    debouncedSearchUser(searchQuery);
  }, [searchQuery, debouncedSearchUser]);

  return {
    isPending,
    searchedUsers: searchResult,
    isLoading: searchResult === null,
    isError: !!error,
  };
};
