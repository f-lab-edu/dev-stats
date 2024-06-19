import { fetchGithub } from "./fetchGithub";

type ActivityWeek = {
  contributionDays: {
    date: string;
    contributionCount: number;
  }[];
}[];

const YEARLY_ACTIVITY_QUERY = `
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export const getYearlyActivities = async (username: string) => {
  const result = await fetchGithub.post("/graphql", {
    query: YEARLY_ACTIVITY_QUERY,
    variables: {
      username,
    },
  });
  const weeks: ActivityWeek =
    result.data.user.contributionsCollection.contributionCalendar.weeks;
  const flatData = weeks.flatMap(week => week.contributionDays);

  return flatData;
};
