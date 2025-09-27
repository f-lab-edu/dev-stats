"use client";

import { getUserSummary } from "@/apis/getUserSummary";
import { useQuery } from "@/hooks/useQuery";

type SummaryProps = {
  username: string;
  messageForSummary: string;
};

export const Summary = ({ username, messageForSummary }: SummaryProps) => {
  const {
    data: summary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["summary", username],
    queryFn: () => getUserSummary(username, messageForSummary),
  });

  if (isLoading) return <SummarySkeleton />;

  if (error) {
    throw new Error("Failed to fetch summary data");
  }

  return <p className="line-clamp-4 text-sm leading-[18px]">{summary}</p>;
};

const SummarySkeleton = () => {
  return (
    <div>
      <p className="skeleton w-full h-[14px]" />
      <p className="skeleton w-full h-[14px] mt-1 " />
      <p className="skeleton w-full h-[14px] mt-1" />
      <p className="skeleton w-60 h-[14px] mt-1" />
    </div>
  );
};
