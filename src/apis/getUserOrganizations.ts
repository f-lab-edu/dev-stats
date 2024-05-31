import { fetchGithub } from ".";

export const getUserOrganizations = async (user: string) => {
  return await fetchGithub.get(`/users/${user}/orgs`);
};
