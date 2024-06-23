import { getDashboardData } from "@/apis";

import { UserPageClient } from "./UserPageClient";

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  const username = params.username;
  const {
    profile,
    languages,
    organizations,
    contributedRepos,
    pinnedRepos,
    yearlyActivities,
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
    />
  );
};

export default UserPage;
