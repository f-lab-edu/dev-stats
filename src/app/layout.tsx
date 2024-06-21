import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevStats - GitHub Activity Visualizer",
  description:
    "Visualize your GitHub activity with DevStats. Track your contributions, languages, and more.",
  metadataBase: new URL("https://github-dev-stats.vercel.app/"),
  openGraph: {
    title: "DevStats - GitHub Activity Visualizer",
    description:
      "Visualize your GitHub activity with DevStats. Track your contributions, languages, and more.",
    url: "https://github-dev-stats.vercel.app/",
    images: [
      {
        url: "/open-graph.png",
        width: 800,
        height: 600,
        alt: "DevStats",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="bg-blue-100">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
