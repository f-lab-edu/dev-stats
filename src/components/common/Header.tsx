import Link from "next/link";
import { Logo } from "./Logo";
import { Search } from "../search";

export const Header = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div
        className="
          flex items-center w-full max-w-[1100px] h-24
          justify-between relative px-5
        "
      >
        <Logo size="sm" />
        <div className="hidden md:flex absolute-center max-w-[400px] w-full">
          <Search size="sm" />
        </div>
        <Link href="/">버튼</Link>
      </div>
    </div>
  );
};
