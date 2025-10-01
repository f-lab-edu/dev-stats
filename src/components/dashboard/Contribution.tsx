"use client";

import Link from "next/link";
import Image from "next/image";

import { ContributedRepoType } from "@/types";
import { formatCount } from "@/utils";
import { useTranslations } from "next-intl";

const GITHUB_URL = "https://www.github.com/";
const PREFIX = "(★";
const SUFFIX = ")";

type ContributionProps = {
  contributedRepoData: ContributedRepoType[] | null;
  username: string;
};

export const Contribution = ({
  contributedRepoData,
  username,
}: ContributionProps) => {
  const t = useTranslations("dashboard");

  if (!contributedRepoData) {
    throw new Error(t("failed_to_fetch_contribution_data"));
  }

  if (contributedRepoData.length === 0) {
    throw new Error(t("no_contribution_data_found"));
  }

  return (
    <div className="flex-1 grid grid-cols-3 grid-rows-3 mt-1 gap-2">
      {contributedRepoData?.slice(0, 9).map((repo, index) => (
        <Link
          href={`${GITHUB_URL + repo.repository}/pulls?q=author%3A${username}+is%3Apr+is%3Aclosed`}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
          className="
              flex justify-center gap-2 px-2 pt-3 pb-1
              min-w-[100px] rounded-lg hover:bg-gray-200/90 cursor-pointer
            "
        >
          <div className="flex flex-col gap-3 items-center justify-center">
            <Image
              src={repo.avatarUrl}
              alt={`${repo.repository} image`}
              width={50}
              height={50}
              className="rounded-full max-w-9 max-y-9 flex-shrink bg-white"
            />
            <div className="flex flex-col gap-[2px] text-center">
              <h2 className="text-md font-medium leading-4">
                {repo.repository.split("/")[1]}{" "}
              </h2>
              <span className="text-[12px] h-[18px] text-gray-400">
                {formatCount(repo.stargazerCount, PREFIX, SUFFIX)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
