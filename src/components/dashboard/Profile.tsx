import Image from "next/image";

import { ProfileType } from "@/types";

type ProfileProps = {
  profileData: ProfileType | null;
};

export const Profile = ({ profileData }: ProfileProps) => {
  if (!profileData) {
    throw new Error("Failed to get profile data.");
  }

  return (
    <div className="flex flex-col items-center my-auto gap-2">
      <Image
        src={profileData.avatar_url}
        alt={profileData.name}
        width={150}
        height={150}
        className="rounded-full border-2 border-solid border-blue-100"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-semibold">{profileData.name}</h1>
        <h2 className="text-lg leading-4 text-gray-500">{profileData.login}</h2>
        <p className="mt-3">{profileData.bio}</p>
      </div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center my-auto gap-2">
      <div className="w-[150px] h-[150px] skeleton" />
      <div className="flex flex-col items-center gap-1">
        <div className="w-36 h-[18px] skeleton" />
        <div className="w-24 h-[18px] skeleton" />
        <div className="w-48 h-[16px] skeleton" />
      </div>
    </div>
  );
};
