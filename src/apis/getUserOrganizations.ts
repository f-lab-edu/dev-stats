import { fetchGithub } from ".";

export const getUserOrganizations = async (username: string) => {
  return await fetchGithub.get(`/users/${username}/orgs`);
};
