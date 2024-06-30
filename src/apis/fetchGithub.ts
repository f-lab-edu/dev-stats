import { request } from "./utils";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

if (!GITHUB_ACCESS_TOKEN) {
  throw new Error("Missing Access Token");
}

export const fetchGithub = request.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
  },
  next: {
    revalidate: 60 * 60 * 24,
  },
});

export const fetchGithubWithoutToken = request.create({
  baseURL: GITHUB_API_URL,
  next: {
    revalidate: 60 * 60 * 24,
  },
});
