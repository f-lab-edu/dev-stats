"use server";

import OpenAI from "openai";
import { LRUCache } from "lru-cache";

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
): Promise<string> => {
  const cachedSummary = cache.get(username);

  if (cachedSummary && typeof cachedSummary === "string") {
    return cachedSummary;
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Summarize the user's GitHub profile in 500 characters or less, using "${username}" as the subject (not using he/she/they). Include programming languages used, open source in contributions key, and projects in pinned repos key.`,
      },
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
