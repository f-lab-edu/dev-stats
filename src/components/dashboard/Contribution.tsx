"use client";

import { HTMLAttributes } from "react";
import Link from "next/link";
import Image from "next/image";

import { ContributedRepoType } from "@/types";

import { Section } from "../common";
import { usePathname } from "next/navigation";

const GITHUB_URL = "https://www.github.com/";

type ContributionProps = {
  contributedRepoData: ContributedRepoType[] | null;
} & HTMLAttributes<HTMLElement>;

export const Contribution = ({
  contributedRepoData,
  ...props
}: ContributionProps) => {
  const username = usePathname().split("/")[1];

  const formatStartCount = (count: number) => {
    const prefix = "(★";
    const suffix = ")";

    if (count > 1000) {
      return prefix + (count / 1000).toFixed(1) + "k" + suffix;
    }

    if (count === 0) return " ";

    return prefix + count + suffix;
  };

  return (
    <Section title="Contribution" {...props}>
      <div className="flex-1 grid grid-cols-3 grid-rows-3 mt-1 gap-2">
        {contributedRepoData?.slice(0, 9).map((repo, index) => (
          <Link
            href={`${GITHUB_URL + repo.repository}/pulls?q=author%3A${username}+is%3Apr+is%3Aclosed`}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="
              flex justify-center gap-2 overflow-auto px-2 pt-3 pb-1
              min-w-[100px] rounded-lg hover:bg-blue-100/90 cursor-pointer
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
                  {formatStartCount(repo.stargazerCount)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
};
