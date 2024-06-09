import Image from "next/image";
import { ProfileType } from "@/types";

type ProfileProps = {
  profileData: ProfileType | null;
};

export const Profile = ({ profileData }: ProfileProps) => {
  if (!profileData) {
    throw new Error("Profile data is not provided");
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
