"use client";

import { usePathname } from "next/navigation";
import { useRole } from "@/app/context/role-context";
import {
  generalNavItems,
  curatorNavItems,
  accountNavItems,
  profileSetupItem,
  PROTECTED_ROUTES,
  CURATOR_ROUTES,
} from "@/components/comon/navigation";
import { NavItem } from "@/components/comon/navigation";

import { useMemo, useCallback } from "react";

export const useNavigation = () => {
  const pathname = usePathname();
  const { userRole, isProfileComplete, isRoleSelected, isWalletConnected } =
    useRole();

  const isLandingPage = pathname === "/";

  const isDashboardPage =
    PROTECTED_ROUTES.some((path) => pathname.startsWith(path)) ||
    pathname === "/account-type" ||
    pathname === "/profile-setup" ||
    pathname === "/connect-wallet" ||
    pathname === "/find-artisyns";

  const isCuratorPage = CURATOR_ROUTES.some((path) =>
    pathname.startsWith(path)
  );

  const isHeaderLinkActive = useCallback(
    (href: string) => {
      if (pathname === href) return true;

      if (
        (href === "/curator/dashboard" &&
          pathname.startsWith("/curator/") &&
          isProfileComplete) ||
        (href === "/finder/dashboard" &&
          pathname.startsWith("/finder/") &&
          isProfileComplete)
      ) {
        return true;
      }

      return false;
    },
    [pathname, userRole, isProfileComplete]
  );

  const isSidebarItemActive = useCallback(
    (href: string) => pathname === href,
    [pathname]
  );

  const desktopNavItems = useMemo((): NavItem[] => {
    if (!isWalletConnected) {
      return [{ label: "Find Artisans", href: "/find-artisyns" }];
    }

    if (!isProfileComplete) {
      return [
        ...generalNavItems,
        {
          label: "Complete Profile",
          href: isRoleSelected ? "/profile-setup" : "/account-type",
        },
      ];
    }
    
    const curatorDashboardItem = {
      label: "Curator Dashboard",
      href: curatorNavItems[0].href,
    };
    const finderDashboardItem = {
      label: "Finder Dashboard",
      href: "/finder/dashboard",
    };

    return [
      ...generalNavItems,
      userRole === "curator" ? curatorDashboardItem : finderDashboardItem,
    ];
  }, [isWalletConnected, isRoleSelected, userRole, isProfileComplete]);

  const mobileNavSections = useMemo(() => {
    if (!isRoleSelected) {
      return [
        {
          title: "NAVIGATION",
          items: [{ label: "Find Artisans", href: "/find-artisyns" }],
        },
      ];
    }

    if (!isCuratorPage) {
      return [{ title: "NAVIGATION", items: desktopNavItems }];
    }

    const sections = [{ title: "GENERAL", items: generalNavItems }];

    if (isProfileComplete) {
      sections.push(
        { title: "CURATOR TOOLS", items: curatorNavItems },
        { title: "ACCOUNT", items: accountNavItems }
      );
    } else {
      sections.push({ title: "SETUP REQUIRED", items: [profileSetupItem] });
    }

    return sections;
  }, [isRoleSelected, isCuratorPage, isProfileComplete, desktopNavItems]);

  return {
    isLandingPage,
    isDashboardPage,
    isCuratorPage,
    isHeaderLinkActive,
    isSidebarItemActive,
    desktopNavItems,
    mobileNavSections,
  };
};
