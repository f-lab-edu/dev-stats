import { Suspense } from "react";

import { LanguagesType, ProfileType } from "@/types";

import {
  Language,
  LanguageSkeleton,
  Profile,
  ProfileSkeleton,
  Section,
} from "@/components";

type UserPageClientProps = {
  profileData: ProfileType | null;
  languagesData: LanguagesType | null;
};

export const UserPageClient = ({
  profileData,
  languagesData,
}: UserPageClientProps) => {
  return (
    <div className="mt-6 w-full max-w-[1100px]">
      <div
        className="
          flex flex-col px-5 gap-4 w-full
          lg:w-[1000px] lg:h-[800px]
          lg:grid lg:grid-cols-10 lg:grid-rows-9
        "
      >
        <div
          className="
            flex flex-col gap-4
            lg:grid lg:col-span-3 lg:row-span-6
          "
        >
          <Suspense fallback={<ProfileSkeleton className="row-span-8" />}>
            <Profile profileData={profileData} className="row-span-8" />
          </Suspense>
          <Suspense fallback={<LanguageSkeleton className="row-span-6" />}>
            <Language languageData={languagesData} className="row-span-6" />
          </Suspense>
          <Section title="Organizations" className="row-span-1">
            조직
          </Section>
        </div>

        <div
          className="
           flex flex-col  gap-4
           lg:grid lg:col-span-7 lg:row-span-6
          "
        >
          <Section title="Summary" className="col-span-9 row-span-1">
            프로필
          </Section>

          <Section title="Contribution" className="col-span-6 row-span-4">
            프로필
          </Section>

          <Section title="Repositories" className="col-span-3 row-span-4">
            프로필
          </Section>
        </div>

        <Section className="col-span-10 row-span-2">프로필</Section>
      </div>
    </div>
  );
};
