import { getDashboardData } from "@/apis";

import { UserPageClient } from "./UserPageClient";

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  const username = params.username;
  const { profile, languages, organizations, contributedRepos, pinnedRepos } =
    await getDashboardData(username);

  return (
    <UserPageClient
      profile={profile}
      languages={languages}
      organizations={organizations}
      contributedRepos={contributedRepos}
      pinnedRepos={pinnedRepos}
    />
  );
};

export default UserPage;
