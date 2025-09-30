import { getDashboardData } from "@/apis";
import { UserNotFoundError } from "@/errors";

import { UserPageClient } from "./UserPageClient";
import UserNotFound from "../user-not-found";
import Error from "../error";

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  const username = params.username;
  try {
    const {
      profile,
      languages,
      organizations,
      contributedRepos,
      pinnedRepos,
      yearlyActivities,
      messageForSummary,
    } = await getDashboardData(username);

    return (
      <UserPageClient
        username={username}
        profile={profile}
        languages={languages}
        organizations={organizations}
        contributedRepos={contributedRepos}
        pinnedRepos={pinnedRepos}
        yearlyActivities={yearlyActivities}
        messageForSummary={messageForSummary}
      />
    );
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return <UserNotFound username={error.username} />;
    }
  }

  return <Error />;
};

export default UserPage;
