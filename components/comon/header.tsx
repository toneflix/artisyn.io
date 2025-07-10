"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import Svgs from "@/components/ui/icons/icon";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/hooks/use-navigation";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { UserActions } from "./user-action";

const Logo = ({ isDashboard }: { isDashboard: boolean }) => (
  <Svgs.logo
    className={`h-6.5 ${isDashboard ? "text-gray-900" : "text-white"}`}
  />
);

export const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { isLandingPage, isDashboardPage } = useNavigation();

  return (
    <>
      <nav
        className={cn(
          "flex justify-between items-center z-50 w-full pr-12 pl-12 px-5 py-4",
          isLandingPage ? "absolute top-10 bg-transparent" : "border-b",
          isDashboardPage && " border-b bg-white"
        )}
      >
        <div className="flex items-center gap-10 z-10 relative">
          <Link href="/" className="cursor-pointer">
            <Logo isDashboard={isDashboardPage} />
          </Link>
          <DesktopNav />
        </div>

        <div className="flex items-center gap-2 z-10 relative">
          <UserActions />
          <div className="lg:hidden">
            <Button
              onClick={() => setShowMobileNav(!showMobileNav)}
              variant="ghost"
              className={cn(
                "p-0",
                isDashboardPage ? "text-gray-900" : "text-white"
              )}
            >
              {showMobileNav ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {showMobileNav && <MobileNav onClose={() => setShowMobileNav(false)} />}
    </>
  );
};
