import { PinnedRepoType } from "@/types";
import { fetchGithub } from ".";

const REPOS_QUERY = `
  query ($username: String!) {
    user(login: $username) {
      pinnedItems(first: 10, types: REPOSITORY) {
        totalCount
        edges {
          node {
            ... on Repository {
              name
              description
              stargazerCount
              forkCount
              url
            }
          }
        }
      }
    }
  }
`;

export const getUserPinnedRepos = async (username: string) => {
  const result = await fetchGithub.post("/graphql", {
    query: REPOS_QUERY,
    variables: {
      username,
    },
  });

  const pinnedRepos = result.data.user.pinnedItems.edges.map(
    ({ node }: { node: PinnedRepoType }) => node,
  );

  return pinnedRepos;
};
