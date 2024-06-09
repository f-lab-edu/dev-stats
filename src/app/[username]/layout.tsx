import { Header } from "@/components";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center max-w-[1020px] mx-auto h-[100dvh]">
        {children}
      </main>
    </>
  );
};

export default Layout;
