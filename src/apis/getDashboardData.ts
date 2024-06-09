import { ProfileType } from "@/types";
import { getUserProfile } from "./getUserProfile";

export const getDashboardData = async (username: string) => {
  const promises = {
    profile: getUserProfile(username),
  };
  const data: Record<string, unknown> = {};

  const response = await Promise.allSettled(Object.values(promises));

  response.forEach((response, index) => {
    if (response.status === "fulfilled") {
      data[Object.keys(promises)[index]] = response.value;
    }
  });

  const profileData = data.profile as ProfileType;

  return { profileData };
};
