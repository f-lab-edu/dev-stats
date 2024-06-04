import { fetchGithub } from "./fetchGithub";

export const getUserProfile = async (username: string) => {
  return await fetchGithub.get(`/users/${username}`);
};
