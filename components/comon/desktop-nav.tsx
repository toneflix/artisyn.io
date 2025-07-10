"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/hooks/use-navigation";

export const DesktopNav = () => {
  const {  desktopNavItems, isHeaderLinkActive } =
    useNavigation();

  return (
    <nav className="hidden lg:flex items-center gap-10">
      {desktopNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors",
            "text-[#5B6B79] hover:text-blue-600",
            isHeaderLinkActive(item.href) && "text-[#020817] font-semibold"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
