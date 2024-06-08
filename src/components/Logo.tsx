import { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

type LogoProps = {
  size?: "sm" | "lg";
  href?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "size" | "href">;

export const Logo = ({ size = "sm", href = "/", ...props }: LogoProps) => {
  return (
    <Link href={href} className={cn(LogoVariants({ size }))} {...props}>
      devstats
    </Link>
  );
};

const LogoVariants = cva(`font-semibold text-blue-500`, {
  variants: {
    size: {
      sm: "text-3xl",
      lg: "text-6xl ",
    },
  },
});
