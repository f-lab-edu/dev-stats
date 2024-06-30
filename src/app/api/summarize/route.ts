"use server";

import OpenAI from "openai";
import { LRUCache } from "lru-cache";

const cacheOptions = {
  max: 100,
  ttl: 1000 * 60 * 60 * 24,
};

const cache = new LRUCache(cacheOptions);

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export default async function summarize(username: string, messages: string) {
  const cachedSummary = cache.get(username);

  if (cachedSummary) {
    return cachedSummary;
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "summarize in 300 characters or less who this user is, what languages they speak, and what types of projects they contribute to.",
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
}
