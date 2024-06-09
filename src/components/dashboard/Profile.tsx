import Image from "next/image";
import { HTMLAttributes } from "react";

import { ProfileType } from "@/types";

import { Section } from "../common";

type ProfileProps = {
  profileData: ProfileType | null;
} & HTMLAttributes<HTMLElement>;

export const Profile = ({ profileData, ...props }: ProfileProps) => {
  if (!profileData) {
    throw new Error("Profile data is not provided");
  }

  return (
    <Section {...props}>
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
          <h2 className="text-lg leading-4 text-gray-500">
            {profileData.login}
          </h2>
          <p className="mt-3">{profileData.bio}</p>
        </div>
      </div>
    </Section>
  );
};

export const ProfileSkeleton = (props: HTMLAttributes<HTMLElement>) => {
  return (
    <Section {...props}>
      <div className="flex flex-col items-center my-auto gap-2">
        <div className="w-[150px] h-[150px] skeleton" />
        <div className="flex flex-col items-center gap-1">
          <div className="w-36 h-[18px] skeleton" />
          <div className="w-24 h-[18px] skeleton" />
          <div className="w-48 h-[16px] skeleton" />
        </div>
      </div>
    </Section>
  );
};
