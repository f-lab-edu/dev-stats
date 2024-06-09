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

const getUserReposWithLanguages = async (username: string) => {
  const result = await fetchGithub.post("/graphql", {
    query: REPOS_WITH_LANGUAGES_QUERY,
    variables: {
      username,
    },
  });

  return result.data.user.repositories.nodes;
};

const extractLanguages = (repos: RepoWithLanguages[]) => {
  return repos.reduce((acc, repo) => {
    repo.languages.edges.forEach(({ node, size }) => {
      acc[node.name] = (acc[node.name] || 0) + size;
    });
    return acc;
  }, {} as LanguageStats);
};

const calculatePercent = (data: CalculatePercentProps) => {
  const total = Object.values(data).reduce((acc, value) => acc + value, 0);
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, (value / total) * 100]),
  );
};

export const getUserLanguages = async (username: string) => {
  const repos = await getUserReposWithLanguages(username);
  const languageStats = extractLanguages(repos);
  const languagePercent = calculatePercent(languageStats);
  const sortedLanguagesArray = Object.entries(languagePercent).sort(
    ([, a], [, b]) => b - a,
  );
  return Object.fromEntries(sortedLanguagesArray);
};
