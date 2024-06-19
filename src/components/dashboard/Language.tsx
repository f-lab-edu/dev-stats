import { LanguagesType } from "@/types";
import { LANGUAGE_COLOR } from "@/data/languageColor";
import { cn } from "@/utils";

import { BarChart } from "../chart";

type LanguageProps = {
  languageData: LanguagesType | null;
};

export const Language = ({ languageData }: LanguageProps) => {
  if (!languageData) {
    throw new Error("Failed to get Languages data.");
  }

  return (
    <div className="flex flex-col gap-4">
      <BarChart data={languageData} colorObject={LANGUAGE_COLOR} />
      <LanguageList languageData={languageData} />
    </div>
  );
};

const LanguageList = ({ languageData }: { languageData: LanguagesType }) => {
  return (
    <ul className="flex flex-wrap gap-2 gap-y-0">
      {Object.entries(languageData).map(([language, percentage]) => (
        <li key={language} className="flex items-center text-xs gap-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                LANGUAGE_COLOR[language as keyof typeof LANGUAGE_COLOR],
            }}
          />
          <span className="font-medium">{language}</span>
          <span className="text-gray-400">{percentage.toFixed(1)}%</span>
        </li>
      ))}
    </ul>
  );
};

export const LanguageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-3 skeleton" />
      <ul className="flex flex-wrap gap-3 gap-y-[2px]">
        {LANGUAGE_SKELETON_ARRAY.map((width, index) => (
          <li key={index} className="flex items-center text-xs gap-1">
            <div className={cn("skeleton h-2 w-2")} />
            <div className={cn("skeleton h-3", width)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const LANGUAGE_SKELETON_ARRAY = ["w-28", "w-20", "w-20", "w-24", "w-16"];
