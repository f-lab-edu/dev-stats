import { HTMLAttributes } from "react";

import { LanguagesType } from "@/types";
import { LANGUAGE_COLOR } from "@/data/languageColor";

import { Section } from "../common";
import { BarChart } from "../chart";

type LanguageProps = {
  languageData: LanguagesType | null;
} & HTMLAttributes<HTMLElement>;

export const Language = ({ languageData, ...props }: LanguageProps) => {
  if (!languageData) {
    throw new Error("Language data is not provided");
  }

  return (
    <Section title="Languages" {...props}>
      <div className="flex flex-col gap-4">
        <BarChart data={languageData} colorObject={LANGUAGE_COLOR} />
        <LanguageList languageData={languageData} />
      </div>
    </Section>
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
