import { fetchGithub } from "./fetchGithub";

export const getUsersBySearchQuery = async (searchQuery: string) => {
  return await fetchGithub.get(`/search/users?q=${searchQuery}`);
};
