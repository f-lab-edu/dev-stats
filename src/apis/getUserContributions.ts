import { ContributedRepoType } from "@/types";
import { fetchGithub } from "./fetchGithub";

type RepositoriesType = {
  repository: {
    nameWithOwner: string;
    stargazerCount: number;
    owner: {
      avatarUrl: string;
    };
  };
}[];

const CONTRIBUTED_REPOS_QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      commitContributionsByRepository(maxRepositories: 100) {
        repository {
          nameWithOwner
          stargazerCount
          owner {
            avatarUrl
          }
        }
      }
    }
  }
}
`;

export const getUseContributedRepos = async (username: string) => {
  const result = await fetchGithub.post("/graphql", {
    query: CONTRIBUTED_REPOS_QUERY,
    variables: {
      username,
    },
  });

  const repositories: RepositoriesType =
    result.data.user.contributionsCollection.commitContributionsByRepository;

  const userContributedRepos: ContributedRepoType[] = repositories.map(
    repo => ({
      repository: repo.repository.nameWithOwner,
      stargazerCount: repo.repository.stargazerCount,
      avatarUrl: repo.repository.owner.avatarUrl,
    }),
  );

  const topRepositories = userContributedRepos
    .sort((a, b) => b.stargazerCount - a.stargazerCount)
    .slice(0, 10);

  return topRepositories;
};

const getUserCommits = async (
  username: string,
  repoOwner: string,
  repoName: string,
) => {
  const result = await fetchGithub.get(
    `/repos/${repoOwner}/${repoName}/commits?author=${username}`,
  );
  return result;
};

export const getUserPullRequests = async (
  username: string,
  repoOwner: string,
  repoName: string,
) => {
  const commits = await getUserCommits(username, repoOwner, repoName);

  const commitShas = [
    ...new Set(commits.map((commit: { sha: string }) => commit.sha)),
  ];

  const pullRequests = await Promise.all(
    commitShas.map(async commitSha => {
      return await fetchGithub.get(
        `/repos/${repoOwner}/${repoName}/commits/${commitSha}/pulls`,
      );
    }),
  );

  const uniquePullRequests = Array.from(
    new Set(pullRequests.flat().map(pr => pr.url)),
  ).map(url => {
    return pullRequests.flat().find(pr => pr.url === url);
  });

  return uniquePullRequests;
};
