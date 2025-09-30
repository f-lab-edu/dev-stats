import Image from "next/image";

import { OrganizationType } from "@/types";
import { useTranslations } from "next-intl";

const GITHUB_URL = "https://github.com/";

type OrganizationsProps = {
  oranizationsData: OrganizationType[] | null;
};

export const Organization = ({ oranizationsData }: OrganizationsProps) => {
  const t = useTranslations("dashboard");

  if (!oranizationsData) {
    throw new Error(t("failed_to_fetch_organization_data"));
  }

  if (oranizationsData.length === 0) {
    throw new Error(t("no_organization_data_found"));
  }

  return (
    <div className="flex gap-1">
      {oranizationsData.map(organization => (
        <a
          key={organization.id}
          href={`${GITHUB_URL}${organization.login}`}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={organization.avatar_url}
            alt={organization.login}
            className="rounded-full border border-solid border-blue-100"
            width={36}
            height={36}
          />
        </a>
      ))}
      {oranizationsData.length === 0 && (
        <span className="text-md text-gray-400">No organizations</span>
      )}
    </div>
  );
};

export const OrganizationSkeleton = () => {
  return (
    <div className="flex gap-1">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="skeleton h-9 w-9 rounded-full" />
      ))}
    </div>
  );
};
