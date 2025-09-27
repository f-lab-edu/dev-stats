import { fetchGithub } from ".";

export const getUserEvents = async (username: string) => {
  return await fetchGithub.get(`/users/${username}/events`);
};
