import { useQuery } from "./useQuery";
import { SearchedUser } from "@/types";
import { getUsersBySearchQuery } from "@/apis";

export const fetchUsers = async (query: string): Promise<SearchedUser[]> => {
  const response = await getUsersBySearchQuery(query);
  return response.items.slice(0, 5);
};

export const useSearchUserQuery = (searchQuery: string) => {
  const { isPending, isLoading, data, error } = useQuery<SearchedUser[]>({
    queryKey: ["searchedUsers", searchQuery],
    queryFn: () => fetchUsers(searchQuery),
    options: { enabled: searchQuery.length >= 3 },
  });

  return {
    isPending,
    searchedUsers: data,
    isLoading,
    isError: !!error,
  };
};
