"use client";

import { Logo, Search } from "@/components";

const MainPageClient = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-10 pb-40 px-5">
      <Logo size="lg" />
      <div className="relative flex flex-col items-center w-full">
        <Search size="lg" />
      </div>
    </div>
  );
};

export default MainPageClient;
