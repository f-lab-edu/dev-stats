import { UserNotFoundError } from "@/errors";
import { getUserProfile } from "./getUserProfile";
import { getUserLanguages } from "./getUserLanguages";
import { getUserOrganizations } from "./getUserOrganizations";
import { getUseContributedRepos } from "./getUserContributions";
import { getUserPinnedRepos } from "./getUserPinnedRepos";
import { getYearlyActivities } from "./getYearlyActivities";
import {
  ContributedRepoType,
  LanguagesType,
  OrganizationType,
  PinnedRepoType,
  ProfileType,
  YearlyActivitiesType,
} from "@/types";

export type DashboardDataType = {
  profile: ProfileType | null;
  languages: LanguagesType | null;
  organizations: OrganizationType[] | null;
  contributedRepos: ContributedRepoType[] | null;
  pinnedRepos: PinnedRepoType[] | null;
  yearlyActivities: YearlyActivitiesType | null;
  messageForSummary: string;
};

export const getDashboardData = async (
  username: string,
): Promise<DashboardDataType> => {
  const promises = {
    profile: getUserProfile(username),
    languages: getUserLanguages(username),
    organizations: getUserOrganizations(username),
    contributedRepos: getUseContributedRepos(username),
    pinnedRepos: getUserPinnedRepos(username),
    yearlyActivities: getYearlyActivities(username),
  };

  const response = await Promise.allSettled(Object.values(promises));

  const data = Object.keys(promises).reduce((acc, key, index) => {
    const result = response[index];
    if (result.status === "fulfilled") {
      acc[key as keyof typeof promises] = result.value;
    } else {
      if (result.reason.message === "Not Found") {
        throw new UserNotFoundError(username);
      }

      acc[key as keyof typeof promises] = null;
    }
    return acc;
  }, {} as DashboardDataType);

  const messageForSummary = getMessageForSummary(data);

  data.messageForSummary = messageForSummary;

  return data;
};

const getMessageForSummary = (data: DashboardDataType) => {
  const nickname = data.profile?.login || "";
  const languages = Object.keys(data.languages || {}).join(", ");
  const organizations = (data.organizations || [])
    .map(org => org.login)
    .join(", ");
  const contributedRepos = (data.contributedRepos || [])
    .map(repo => `${repo.repository} + ${repo.stargazerCount}`)
    .join(", ");
  const pinnedRepos = data.pinnedRepos || [];

  return JSON.stringify({
    nickname,
    languages,
    organizations,
    contributedRepos,
    pinnedRepos,
  });
};
