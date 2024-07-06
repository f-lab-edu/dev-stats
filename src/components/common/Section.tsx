import { cn } from "@/utils";

import { Title } from "./Title";

type SectionProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Section = ({
  children,
  title,
  className,
  ...props
}: SectionProps) => {
  return (
    <section
      className={cn(
        `
          px-4 py-3 rounded-xl border border-gray-100 border-solid
          flex flex-col gap-2 bg-white/70 text-gray-600
          shadow-sm
        `,
        className,
      )}
      {...props}
    >
      {!!title && <Title className="text-gray-800">{title}</Title>}
      {children}
    </section>
  );
};
