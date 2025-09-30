import { defineRouting } from "next-intl/routing";
import { Locale } from "@/types/lcoale";

export const routing = defineRouting({
  locales: ["ko", "en"] as Locale[],

  defaultLocale: "ko",
});
