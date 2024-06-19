import { Suspense } from "react";

import {
  Contribution,
  Profile,
  Language,
  LanguageSkeleton,
  Organization,
  OrganizationSkeleton,
  PinnedRepositories,
  YearlyActivities,
  ProfileSkeleton,
  Section,
} from "@/components";
import { DashboardDataType } from "@/apis";

export const UserPageClient = ({
  profile,
  languages,
  organizations,
  contributedRepos,
  pinnedRepos,
  yearlyActivities,
}: DashboardDataType) => {
  return (
    <div className="mt-4 w-full max-w-[1200px]">
      <div
        className="
          flex flex-col px-5 gap-3 w-full
          lg:max-w-[1200px] lg:h-[900px]
          lg:grid lg:grid-cols-12 lg:grid-rows-9
        "
      >
        <div
          className="
            flex flex-col gap-3
            lg:grid lg:col-span-3 lg:row-span-6
          "
        >
          <Suspense fallback={<ProfileSkeleton className="row-span-8" />}>
            <Profile profileData={profile} className="row-span-8" />
          </Suspense>
          <Suspense fallback={<LanguageSkeleton className="row-span-2" />}>
            <Language languageData={languages} className="row-span-2" />
          </Suspense>
          <Suspense fallback={<OrganizationSkeleton className="row-span-1" />}>
            <Organization
              oranizationsData={organizations}
              className="row-span-1"
            />
          </Suspense>
        </div>

        <div
          className="
            flex flex-col gap-3
            lg:col-span-9 lg:row-span-6
          "
        >
          <div
            className="
              flex flex-col gap-3 h-full w-full
              lg:grid lg:grid-cols-9 lg:grid-rows-4 
            "
          >
            <Section title="Summary" className="col-span-9 row-span-1">
              프로필
            </Section>

            <Contribution
              className="col-span-5 row-span-4"
              contributedRepoData={contributedRepos}
            />

            <PinnedRepositories
              pinnedReposData={pinnedRepos}
              className="col-span-4 row-span-4"
            />
          </div>
        </div>

        <YearlyActivities
          yearlyAtivitiesData={yearlyActivities}
          className="col-span-12 row-span-3"
        />
      </div>
    </div>
  );
};
