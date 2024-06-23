import { fetchGithub } from "./fetchGithub";

export const getUsersBySearchQuery = async (
  searchQuery: string,
  options?: RequestInit,
) => {
  return await fetchGithub.get(`/search/users?q=${searchQuery}`, options);
};
