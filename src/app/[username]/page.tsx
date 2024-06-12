import { getDashboardData } from "@/apis";

import { UserPageClient } from "./UserPageClient";

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  const username = params.username;
  const { profile, languages, organizations, contributions } =
    await getDashboardData(username);

  return (
    <UserPageClient
      profileData={profile}
      languagesData={languages}
      organizations={organizations}
      contributions={contributions}
    />
  );
};

export default UserPage;
