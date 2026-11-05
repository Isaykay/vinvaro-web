"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocalize } from "@/components/lang-provider";

/** next/link that maps internal (Dutch) hrefs to the current language's URL. */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const localize = useLocalize();
  return <NextLink href={typeof href === "string" ? localize(href) : href} {...props} />;
}
