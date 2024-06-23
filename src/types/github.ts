export type SearchedUser = {
  login: string;
  avatar_url: string;
};

export type ProfileType = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type LanguagesType = {
  [key: string]: number;
};

export type OrganizationType = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string;
  html_url: string;
};

export type PullRequestNode = {
  title: string;
  url: string;
  createdAt: string;
};

export type ContributedRepoType = {
  repository: string;
  stargazerCount: number;
  avatarUrl: string;
};

export type ContributionType = {
  html_url: string;
  title: string;
  state: string;
};

export type PinnedRepoType = {
  name: string;
  description: string;
  url: string;
  forkCount: number;
  stargazerCount: number;
};

export type YearlyActivitiesType = {
  date: string;
  contributionCount: number;
}[];
