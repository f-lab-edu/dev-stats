import { HTMLAttributes } from "react";
import Image from "next/image";

import { OrganizationType } from "@/types";

import { Section } from "../common";

const GITHUB_URL = "https://github.com/";

type OrganizationsProps = {
  oranizationsData: OrganizationType[] | null;
} & HTMLAttributes<HTMLElement>;

export const Organization = ({
  oranizationsData,
  ...props
}: OrganizationsProps) => {
  if (!oranizationsData) {
    throw new Error("Organizations data is not provided");
  }

  return (
    <Section title="Organizations" {...props}>
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
    </Section>
  );
};

export const OrganizationSkeleton = (props: HTMLAttributes<HTMLElement>) => {
  return (
    <Section title="Organizations" {...props}>
      <div className="flex gap-1">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="skeleton h-9 w-9 rounded-full" />
        ))}
      </div>
    </Section>
  );
};
