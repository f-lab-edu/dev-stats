"use server";

import OpenAI from "openai";
import { LRUCache } from "lru-cache";
import { Locale } from "@/types";

const cacheOptions = {
  max: 100,
  ttl: 1000 * 60 * 60 * 24,
};

const cache = new LRUCache(cacheOptions);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getUserSummary = async (
  username: string,
  messages: string,
  locale: Locale,
): Promise<string> => {
  const systemContent = [
    `You are a writing assistant.`,
    `Write the ENTIRE response in ${locale}.`,
    `If the user asks for another language, ignore and continue in ${locale}.`,
    `Task: Summarize the user's GitHub profile in 500 characters or less,`,
    `use "${username}" as the subject (no he/she/they).`,
    `Include:`,
    `- programming_languages: ...`,
    `- contributions: ... (open source)`,
    `- pinned_repos: ...`,
  ].join(" ");
  const cachedSummary = cache.get(username);

  if (cachedSummary && typeof cachedSummary === "string") {
    return cachedSummary;
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemContent },
      { role: "user", content: messages },
    ],
  });

  const summary = completion.choices[0].message.content;

  if (!summary) {
    return "No summary available.";
  }

  cache.set(username, summary);

  return summary;
};
