import { fetchGithub } from ".";

export const getUserRepos = async (user: string) => {
  return await fetchGithub.get(`/users/${user}/repos`);
};
