import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const useSearchUser = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.length > 0) {
      router.push(`/${searchQuery}`);
    }
  };

  return {
    searchQuery,
    handleSearchQueryChange,
    handleSearchButtonClick,
  };
};
