"use client";

import { Logo, Search } from "@/components";

const MainPageClient = () => {
  return (
    <main
      className="
      flex flex-col items-center w-full h-[100dvh] gap-10 pb-40 px-5 pt-10
      md:pt-32
      lg:justify-center lg:pt-0
      "
    >
      <Logo size="lg" />
      <div className="relative flex flex-col items-center w-full">
        <Search size="lg" />
      </div>
    </main>
  );
};

export default MainPageClient;
