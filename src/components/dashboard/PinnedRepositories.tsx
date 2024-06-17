import Link from "next/link";

import { PinnedRepoType } from "@/types";
import { formatCount } from "@/utils";
import { STAR_COUNT_PREFIX, STAR_COUNT_SUFFIX } from "@/constants";

import { Section } from "../common";

type PinnedReposProps = {
  pinnedReposData: PinnedRepoType[] | null;
} & React.HTMLAttributes<HTMLDivElement>;

export const PinnedRepositories = ({
  pinnedReposData,
  ...props
}: PinnedReposProps) => {
  if (!pinnedReposData) {
    throw new Error("Pinned Repos data is not provided");
  }

  return (
    <Section title="Repositories" {...props}>
      <ul className="flex flex-col justify-around h-full my-2 gap-4 lg:gap-3">
        {pinnedReposData.map(repo => (
          <li
            key={repo.name}
            className="
              flex flex-col items-start max-h-[52px] gap-[3px]
              overflow-hidden list-disc
            "
          >
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-400 mr-1" />
              <Link
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex gap-1"
              >
                <span className="text-md leading-4 font-medium">
                  {repo.name}
                </span>
              </Link>
              <div className="flex gap-1">
                <span className="text-[12px] h-[18px] text-gray-400">
                  {formatCount(
                    repo.stargazerCount,
                    STAR_COUNT_PREFIX,
                    STAR_COUNT_SUFFIX,
                  )}
                </span>
                <span className="flex text-[12px] h-[18px] text-gray-400">
                  {formatCount(repo.forkCount, "", " forks")}
                </span>
              </div>
            </div>
            <span className="text-xs leading-4 flex-1 line-clamp-2 ml-4">
              {repo.description}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
};
