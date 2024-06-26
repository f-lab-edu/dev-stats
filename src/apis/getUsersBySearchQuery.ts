import { fetchGithubWithoutToken } from "./fetchGithub";

export const getUsersBySearchQuery = async (searchQuery: string) => {
  return await fetchGithubWithoutToken.get(`/search/users?q=${searchQuery}`);
};
