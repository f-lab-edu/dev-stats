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
  Summary,
} from "@/components";
import { DashboardDataType } from "@/apis";
import { useTranslations } from "next-intl";

export const UserPageClient = ({
  username,
  profile,
  languages,
  organizations,
  contributedRepos,
  pinnedRepos,
  yearlyActivities,
  messageForSummary,
}: DashboardDataType & {
  username: string;
}) => {
  const t = useTranslations("dashboard");
  const yearlyContributions = Object.values(yearlyActivities || {}).reduce(
    (acc, value) => {
      return acc + value.contributionCount;
    },
    0,
  );

  const getYearlyActivitiesTitle = () => {
    if (!yearlyActivities) {
      return t("yearly_activities");
    }

    return `${t("yearly_activities")} (${yearlyContributions})`;
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

          <Section title={t("languages")} className="row-span-2">
            <AsyncBoundary loadingFallback={<LanguageSkeleton />}>
              <Language languageData={languages} />
            </AsyncBoundary>
          </Section>

          <Section title={t("organizations")} className="row-span-1">
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
            <Section
              title={t("summary")}
              className="col-span-9 row-span-1 overflow-y-auto"
            >
              <AsyncBoundary>
                <Summary
                  username={username}
                  messageForSummary={messageForSummary}
                />
              </AsyncBoundary>
            </Section>

            <Section
              title={t("contribution")}
              className="col-span-5 row-span-4"
            >
              <AsyncBoundary>
                <Contribution
                  username={username}
                  contributedRepoData={contributedRepos}
                />
              </AsyncBoundary>
            </Section>

            <Section
              title={t("pinned_repositories")}
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
