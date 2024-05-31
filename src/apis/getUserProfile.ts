import { fetchGithub } from "./fetchGithub";

export const getUserProfile = async (user: string) => {
  return await fetchGithub.get(`/users/${user}`);
};
