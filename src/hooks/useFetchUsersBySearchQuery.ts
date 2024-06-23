import { useEffect, useRef, useState, useTransition } from "react";

import { getUsersBySearchQuery } from "@/apis";
import { SearchedUser } from "@/types";

export const useSearchUserQuery = (searchQuery: string) => {
  const [isPending, startTransition] = useTransition();
  const [searchResult, setSearchResult] = useState<SearchedUser[] | null>(null);
  const [error, setError] = useState<unknown>(null);
  const previousQuery = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const searchUser = async (query: string, signal: AbortSignal) => {
      try {
        const response = await getUsersBySearchQuery(query, { signal });
        startTransition(() => {
          setSearchResult(response.items.slice(0, 5));
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
        }
      }
    };

    if (searchQuery.length < 3) {
      setSearchResult(null);
      return;
    }

    if (previousQuery.current !== searchQuery) {
      previousQuery.current = searchQuery;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      searchUser(searchQuery, controller.signal);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchQuery]);

  return {
    isPending,
    searchedUsers: searchResult,
    isLoading: searchResult === null && !error,
    isError: !!error,
  };
};
