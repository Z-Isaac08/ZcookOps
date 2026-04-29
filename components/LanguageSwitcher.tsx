"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();
  const otherLocale = currentLang === "fr" ? "en" : "fr";

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <Link href={redirectedPathname(otherLocale)}>
      <Button variant="ghost" size="sm" className="flex items-center gap-2">
        <Languages className="w-4 h-4" />
        <span className="uppercase font-bold">{otherLocale}</span>
      </Button>
    </Link>
  );
}
