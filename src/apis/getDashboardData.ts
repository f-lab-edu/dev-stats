import { getUserProfile } from "./getUserProfile";
import { getUserLanguages } from "./getUserLanguages";
import { LanguagesType, ProfileType } from "@/types";

type DashboardData = {
  profile: ProfileType | null;
  languages: LanguagesType | null;
};

export const getDashboardData = async (
  username: string,
): Promise<DashboardData> => {
  const promises = {
    profile: getUserProfile(username),
    languages: getUserLanguages(username),
  };

  const response = await Promise.allSettled(Object.values(promises));

  const data = Object.keys(promises).reduce((acc, key, index) => {
    const result = response[index];
    if (result.status === "fulfilled") {
      acc[key as keyof typeof promises] = result.value;
    } else {
      acc[key as keyof typeof promises] = null;
    }
    return acc;
  }, {} as DashboardData);

  return data;
};
