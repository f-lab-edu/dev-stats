"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import { ContributedRepoType, ContributionType } from "@/types";
import { cn } from "@/utils";
import { getUserPullRequests } from "@/apis";

import { Section } from "../common";

type ContributionProps = {
  contributedRepoData: ContributedRepoType[] | null;
} & HTMLAttributes<HTMLElement>;

export const Contribution = ({
  contributedRepoData,
  ...props
}: ContributionProps) => {
  const username = useParams().username as string;
  const [selectedRepo, setSelectedRepo] = useState<ContributedRepoType | null>(
    contributedRepoData?.[0] || null,
  );
  const [contributions, setContributions] = useState<ContributionType[]>([]);

  const handleSelectRepo = async (repo: ContributedRepoType) => {
    setSelectedRepo(repo);
  };

  useEffect(() => {
    const updateContributions = async () => {
      if (selectedRepo) {
        const repoOwner = selectedRepo.repository.split("/")[0];
        const repoName = selectedRepo.repository.split("/")[1];
        const contributions = await getUserPullRequests(
          username,
          repoOwner,
          repoName,
        );
        setContributions(contributions);
      }
    };
    updateContributions();
  }, [selectedRepo, username]);

  return (
    <Section title="Contribution" {...props}>
      <div className="flex flex-wrap mt-1 gap-2">
        {contributedRepoData?.slice(0, 10).map((repo, index) => (
          <div
            key={index}
            onClick={() => handleSelectRepo(repo)}
            className={cn(
              `
            flex flex-1 justify-center gap-2 overflow-auto px-2 pt-3 pb-1
            min-w-[100px] rounded-lg hover:bg-blue-100/90 cursor-pointer
            `,
              { "bg-blue-100": selectedRepo?.repository === repo.repository },
            )}
          >
            <div className="flex flex-col gap-3 items-center">
              <Image
                src={repo.avatarUrl}
                alt={`${repo.repository} image`}
                width={36}
                height={36}
                className="rounded-full max-w-9 max-y-9 flex-shrink bg-white"
              />
              <div className="flex flex-col gap-[2px] text-center">
                <h2 className="text-md font-semibold leading-4">
                  {repo.repository.split("/")[1]}{" "}
                </h2>
                <span className="text-[12px] text-gray-400">
                  (★{(repo.stargazerCount / 1000).toFixed(1)}k)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ul className="flex-1 px-3 py-3">
        {contributions.map((contribution: ContributionType, index) => (
          <li key={index}>
            <Link
              href={contribution.html_url}
              className="flex items-start gap-2"
              target="_blank"
            >
              <div className="mt-[6px] w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-md hover:underline leading-5">
                {contribution.title} {"  "}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};
