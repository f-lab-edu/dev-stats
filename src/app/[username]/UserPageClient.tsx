import {
  Section,
  AsyncBoundary,
  Profile,
  Language,
  Organization,
  Contribution,
  PinnedRepositories,
  YearlyActivities,
  ProfileSkeleton,
  LanguageSkeleton,
  OrganizationSkeleton,
  YearyActivitiesSkeleton,
} from "@/components";
import { DashboardDataType } from "@/apis";

export const UserPageClient = ({
  username,
  profile,
  languages,
  organizations,
  contributedRepos,
  pinnedRepos,
  yearlyActivities,
}: DashboardDataType & {
  username: string;
}) => {
  const yearlyContributions = Object.values(yearlyActivities || {}).reduce(
    (acc, value) => {
      return acc + value.contributionCount;
    },
    0,
  );

  const getYearlyActivitiesTitle = () => {
    if (!yearlyActivities) {
      return "Yearly Activities";
    }

    return `Yearly Activities (${yearlyContributions})`;
  };

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
          <Section className="row-span-8">
            <AsyncBoundary loadingFallback={<ProfileSkeleton />}>
              <Profile profileData={profile} />
            </AsyncBoundary>
          </Section>

          <Section title="Languages" className="row-span-2">
            <AsyncBoundary loadingFallback={<LanguageSkeleton />}>
              <Language languageData={languages} />
            </AsyncBoundary>
          </Section>

          <Section title="Organizations" className="row-span-1">
            <AsyncBoundary loadingFallback={<OrganizationSkeleton />}>
              <Organization oranizationsData={organizations} />
            </AsyncBoundary>
          </Section>
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

            <Section title="Contribution" className="col-span-5 row-span-4">
              <AsyncBoundary>
                <Contribution
                  username={username}
                  contributedRepoData={contributedRepos}
                />
              </AsyncBoundary>
            </Section>

            <Section
              title="Pinned Repositories"
              className="col-span-4 row-span-4"
            >
              <AsyncBoundary>
                <PinnedRepositories pinnedReposData={pinnedRepos} />
              </AsyncBoundary>
            </Section>
          </div>
        </div>

        <Section
          title={getYearlyActivitiesTitle()}
          className="col-span-12 row-span-3"
        >
          <AsyncBoundary loadingFallback={<YearyActivitiesSkeleton />}>
            <YearlyActivities yearlyAtivitiesData={yearlyActivities} />
          </AsyncBoundary>
        </Section>
      </div>
    </div>
  );
};
