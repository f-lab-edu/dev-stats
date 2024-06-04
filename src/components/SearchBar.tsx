import {
  forwardRef,
  Ref,
  KeyboardEvent,
  useRef,
  ChangeEvent,
  HTMLAttributes,
} from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

type SearchBarProps = {
  containerClassName?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  size?: "sm" | "lg";
} & Omit<HTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">;

const SearchBar = forwardRef(
  (
    {
      containerClassName,
      value,
      onChange,
      onSearch,
      size = "lg",
      ...props
    }: SearchBarProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const isValueExist = value.length > 0;

    const activeState = isValueExist ? "active" : "inactive";

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        buttonRef.current?.click();
      }
    };

    return (
      <div
        role="search"
        className={cn([ContainerVariants({ size }), containerClassName])}
      >
        <Image
          src="/icon/search.svg"
          alt="search"
          width={TYPE_ICON_SIZE[size]}
          height={TYPE_ICON_SIZE[size]}
        />
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder="Search for a user"
          aria-label="Search for a user"
          onKeyDown={handleKeyDown}
          className="
          w-full bg-transparent outline-none
          placeholder-gray-400 flex-1
          "
          {...props}
        />
        <Image
          src="/icon/x-close.svg"
          alt="clear"
          width={TYPE_ICON_SIZE[size]}
          height={TYPE_ICON_SIZE[size]}
          className={cn(["cursor-pointer", { hidden: !isValueExist }])}
          onClick={() =>
            onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
          }
        />
        <button
          ref={buttonRef}
          aria-label="Search"
          tabIndex={0}
          onClick={onSearch}
          className={cn(ButtonVariants({ activeState, size }))}
        >
          <Image
            src="/icon/next.svg"
            alt="search_button"
            width={TYPE_ICON_SIZE[size]}
            height={TYPE_ICON_SIZE[size]}
            className="ml-[2px]"
          />
        </button>
      </div>
    );
  },
);

const ContainerVariants = cva(
  `flex bg-white pl-4 pr-2
  w-full gap-3 items-center
  hover:shadow-md focus:shadow-md focus-within:shadow-md`,
  {
    variants: {
      size: {
        sm: "h-9 rounded-[18px]",
        lg: "h-12 rounded-[24px]",
      },
    },
  },
);

const ButtonVariants = cva(
  `flex items-center justify-center rounded-full
  transition-colors tarnsition-500
  focus:outline-none focus:ring-2 focus:ring-blue-400`,
  {
    variants: {
      activeState: {
        active: "bg-blue-300 cursor-pointer",
        inactive: "bg-gray-300 cursor-default",
      },
      size: {
        sm: "w-6 h-6",
        lg: "w-9 h-9",
      },
    },
  },
);

const TYPE_ICON_SIZE = {
  sm: 16,
  lg: 24,
};

SearchBar.displayName = "SearchBar";
export { SearchBar };
