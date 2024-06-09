import { getDashboardData } from "@/apis";
import { UserPageClient } from "./UserPageClient";

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  const username = params.username;
  const { profileData } = await getDashboardData(username);

  return <UserPageClient profileData={profileData} />;
};

export default UserPage;
