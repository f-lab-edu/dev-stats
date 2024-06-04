import { fetchGithub } from ".";

export const getUserRepos = async (username: string) => {
  return await fetchGithub.get(`/users/${username}/repos`);
};
