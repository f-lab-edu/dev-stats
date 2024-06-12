import { ContributionsType, PullRequestNode } from "@/types";
import { fetchGithub } from "./fetchGithub";

type RepositoriesType = {
  repository: {
    nameWithOwner: string;
    stargazerCount: number;
    owner: {
      avatarUrl: string;
    };
    pullRequests: {
      nodes: PullRequestNode[];
    };
  };
}[];

const CONTRIBUTION_QUERY = `
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
          pullRequests: pullRequests(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              title
              url
              createdAt
              author {
                login
              }
            }
          }
        }
      }
    }
  }
}
`;

export const getUseContributions = async (username: string) => {
  const result = await fetchGithub.post("/graphql", {
    query: CONTRIBUTION_QUERY,
    variables: {
      username,
    },
  });

  const repositories: RepositoriesType =
    result.data.user.contributionsCollection.commitContributionsByRepository;

  const userContributions: ContributionsType[] = repositories.map(repo => ({
    repository: repo.repository.nameWithOwner,
    stargazerCount: repo.repository.stargazerCount,
    avatarUrl: repo.repository.owner.avatarUrl,
    pullRequests: repo.repository.pullRequests.nodes
      .filter((pr: PullRequestNode) => pr.author.login === username)
      .map((pr: PullRequestNode) => ({
        title: pr.title,
        url: pr.url,
        createdAt: pr.createdAt,
      })),
  }));

  const topRepositories = userContributions
    .sort((a, b) => b.stargazerCount - a.stargazerCount)
    .slice(0, 6);

  return topRepositories;
};
