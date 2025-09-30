import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: ReactNode;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
