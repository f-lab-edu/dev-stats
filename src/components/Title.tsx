import {
  ReactNode,
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
} from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/utils";

type HeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TitleProps<T extends HeadingTags> = {
  as?: T;
  size?: "sm" | "md" | "lg";
  align?: "center" | "left" | "right";
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

const TitleInner = <T extends HeadingTags = "h1">(
  {
    as,
    size = "md",
    align = "left",
    className,
    children,
    ...props
  }: TitleProps<T>,
  ref: ForwardedRef<HTMLHeadingElement>,
) => {
  const Heading = as || "h1";
  return (
    <Heading
      ref={ref}
      role="heading"
      className={cn(TitleVariants({ size, align }), className)}
      {...props}
      aria-level={Heading}
    >
      {children}
    </Heading>
  );
};

const TitleVariants = cva(`leading-normal`, {
  variants: {
    size: {
      sm: `text-md font-medium`,
      md: `text-lg font-medium`,
      lg: `text-2xl font-semibold`,
    },
    align: {
      center: `text-center`,
      left: `text-left`,
      right: `text-right`,
    },
  },
  defaultVariants: {
    size: "md",
    align: "left",
  },
});

export const Title = forwardRef(TitleInner) as <T extends HeadingTags = "h1">(
  props: TitleProps<T> & { ref?: ForwardedRef<HTMLHeadingElement> },
) => ReturnType<typeof TitleInner>;
