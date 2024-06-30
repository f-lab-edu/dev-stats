/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "repository-images.githubusercontent.com",
      "opengraph.githubassets.com",
    ],
  },
};

export default nextConfig;
