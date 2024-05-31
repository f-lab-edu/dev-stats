import { fetchGithub } from "./fetchGithub";

type RepoWithLanguages = {
  name: string;
  languages: {
    edges: {
      size: number;
      node: {
        name: string;
      };
    }[];
  };
};

type LanguageStats = {
  [key: string]: number;
};

const REPOS_WITH_LANGUAGES_QUERY = `
  query ($username: String!) {
    user(login: $username) {
      repositories(first: 100) {
        nodes {
          name
          languages(first: 10) {
            edges {
              size
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const getUserReposWithLanguages = async (user: string) => {
  const result = await fetchGithub.post("/graphql", {
    query: REPOS_WITH_LANGUAGES_QUERY,
    variables: {
      username: user,
    },
  });

  return result.data.user.repositories.nodes;
};

export const getUserLanguages = async (user: string) => {
  const repos = await getUserReposWithLanguages(user);
  const languageStats: LanguageStats = {};

  repos.forEach((repo: RepoWithLanguages) => {
    repo.languages.edges.forEach(({ node, size }) => {
      if (languageStats[node.name]) {
        languageStats[node.name] += size;
      } else {
        languageStats[node.name] = size;
      }
    });
  });

  return languageStats;
};
