import { getUserProfile } from "./getUserProfile";
import { getUserLanguages } from "./getUserLanguages";
import { getUserOrganizations } from "./getUserOrganizations";
import {
  ContributedRepoType,
  LanguagesType,
  OrganizationType,
  ProfileType,
} from "@/types";
import { getUseContributedRepos } from "./getUserContributions";

type DashboardData = {
  profile: ProfileType | null;
  languages: LanguagesType | null;
  organizations: OrganizationType[] | null;
  contributedRepos: ContributedRepoType[] | null;
};

export const getDashboardData = async (
  username: string,
): Promise<DashboardData> => {
  const promises = {
    profile: getUserProfile(username),
    languages: getUserLanguages(username),
    organizations: getUserOrganizations(username),
    contributedRepos: getUseContributedRepos(username),
  };

  const response = await Promise.allSettled(Object.values(promises));

  const data = Object.keys(promises).reduce((acc, key, index) => {
    const result = response[index];
    if (result.status === "fulfilled") {
      acc[key as keyof typeof promises] = result.value;
    } else {
      acc[key as keyof typeof promises] = null;
    }
    return acc;
  }, {} as DashboardData);

  return data;
};
