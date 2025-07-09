"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MenuIcon,
  XIcon,
  LogOutIcon,
  LogInIcon,
  User,
  Home,
  ListPlus,
  UserIcon,
  Package,
  BoltIcon,
  Files,
  PaintbrushVerticalIcon,
  LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import Svgs from "@/components/ui/icons/icon";
import { useRole } from "@/app/context/role-context";
import { cn } from "@/lib/utils";

const DASHBOARD_PATHS = [
  "/dashboard",
  "/finder/dashboard",
  "/curator/",
  "/listings",
  "/profile",
  "/archive",
  "/account-settings",
  "/saved",
  "/history",
  "/profile-setup",
];

const Logo = ({ isDashboard }: { isDashboard: boolean }) => (
  <Svgs.logo
    className={`h-6.5 ${isDashboard ? "text-gray-900" : "text-white"}`}
  />
);

const WalletAddress = ({
  isDashboard,
  isConnected,
  address,
}: {
  isDashboard: boolean;
  isConnected: boolean;
  address?: string | null;
}) => {
  if (!isConnected || !address) return null;

  return (
    <div
      className={cn(
        "text-sm px-3 py-1 rounded-full",
        isDashboard ? "text-gray-700 bg-gray-100" : "text-white bg-black/20"
      )}
    >
      {address}
    </div>
  );
};

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    userRole,
    isRoleSelected,
    isProfileComplete,
    isWalletConnected,
    walletAddress,
    disconnectWallet,
  } = useRole();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const isLandingPage = pathname === "/";
  const isDashboardPage = DASHBOARD_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  const isCuratorPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/listings") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/archive") ||
    pathname.startsWith("/account-settings") ||
    pathname.startsWith("/saved") ||
    pathname.startsWith("/history");

  const getNavItems = (): NavItem[] => {
    if (!isRoleSelected) {
      return [{ label: "Find Artisans", href: "/find-artisyns" }];
    }
    const baseItems: NavItem[] = [
      { label: "Home", href: "/" },
      { label: "Find Artisans", href: "/find-artisyns" },
    ];

    if (userRole === "curator") {
      return [...baseItems, { label: "Curator Dashboard", href: "/dashboard" }];
    }
    if (userRole === "finder") {
      return [
        ...baseItems,
        { label: "Finder Dashboard", href: "/finder/dashboard" },
      ];
    }
    return baseItems;
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    const isCuratorRoute = [
      "/dashboard",
      "/finder/dashboard",
      "/listings",
      "/profile",
      "/archive",
      "/account-settings",
      "/saved",
      "/history",
    ].includes(href);

    if (isCuratorRoute && !isProfileComplete) {
      e.preventDefault();
      router.push("/profile-setup");
      return;
    }
  };

  const isNavItemActive = (item: { href: string; label: string }) => {
    if (pathname === item.href) return true;

    if (pathname === "/profile-setup" && !isProfileComplete) {
      return (
        (item.href === "/dashboard" && userRole === "curator") ||
        (item.href === "/finder/dashboard" && userRole === "finder")
      );
    }

    if (item.href === "/dashboard" && userRole === "curator") {
      const curatorPages = [
        "/dashboard",
        "/listings",
        "/profile",
        "/archive",
        "/account-settings",
        "/saved",
        "/history",
      ];
      return curatorPages.some((page) => pathname.startsWith(page));
    }

    if (item.href === "/finder/dashboard" && userRole === "finder") {
      return pathname.startsWith("/finder/");
    }

    return false;
  };

  const getMobileNavSections = () => {
    if (!isCuratorPage || !isRoleSelected) {
      const navItems = getNavItems();

      if (!isRoleSelected) {
        return [
          {
            title: "NAVIGATION",
            items: [{ label: "Find Artisans", href: "/find-artisyns" }],
          },
        ];
      }

      return [
        {
          title: "NAVIGATION",
          items: navItems.map((item) => ({ ...item, icon: undefined })),
        },
      ];
    }

    const generalItems: NavItem[] = [
      { label: "Home", href: "/" },
      { label: "Find Artisans", href: "/find-artisyns" },
    ];

    const sections = [{ title: "GENERAL", items: generalItems }];

    if (isProfileComplete) {
      const curatorItems: NavItem[] = [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: <Home size={18} />,
        },
        {
          label: "Listings",
          href: "/listings",
          icon: <ListPlus size={18} />,
        },
        {
          label: "Profile",
          href: "/profile",
          icon: <UserIcon size={18} />,
        },
        {
          label: "Archive",
          href: "/archive",
          icon: <Package size={18} />,
        },
      ];

      const accountItems: NavItem[] = [
        {
          label: "Account Settings",
          href: "/account-settings",
          icon: <BoltIcon size={18} />,
        },
        {
          label: "Saved",
          href: "/saved",
          icon: <Files size={18} />,
        },
        {
          label: "History",
          href: "/history",
          icon: <PaintbrushVerticalIcon size={18} />,
        },
      ];

      sections.push(
        { title: "CURATOR TOOLS", items: curatorItems },
        { title: "ACCOUNT", items: accountItems }
      );
    } else {
      const setupItems: NavItem[] = [
        {
          label: "Complete Profile Setup",
          href: "/profile-setup",
          icon: <User size={18} />,
        },
      ];

      sections.push({ title: "SETUP REQUIRED", items: setupItems });
    }

    return sections;
  };

  const handleDisconnect = () => {
    disconnectWallet();
    window.location.href = "/";
  };

  return (
    <>
      <nav
        className={`flex justify-between items-center z-50 w-full pr-12 pl-12 px-5 py-4 ${
          isLandingPage ? "absolute top-10 bg-transparent" : "border-b"
        } ${isDashboardPage && " border-b bg-white"}`}
      >
        <div className="flex   items-center gap-15 z-10 relative">
          <Link href="/" className="cursor-pointer">
            <Logo isDashboard={isDashboardPage} />
          </Link>

          <div className="lg:flex hidden items-center gap-6">
            {getNavItems().map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={cn(
                  "text-sm font-medium leading-5",
                  isDashboardPage
                    ? "text-[rgba(2,8,23,0.6)] hover:text-slate-950"
                    : "text-white hover:text-gray-200",
                  isNavItemActive(item) && "font-semibold text-[#020817]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 z-10 relative">
          {isWalletConnected ? (
            <>
              <WalletAddress
                isDashboard={isDashboardPage}
                isConnected={isWalletConnected}
                address={walletAddress}
              />

              <Button
                onClick={handleDisconnect}
                className={cn(
                  "flex items-center gap-2 h-[36px] rounded-[20px] border",
                  isDashboardPage
                    ? "border-slate-200 bg-white text-slate-950 hover:bg-slate-100"
                    : "border-white/20 bg-black/20 text-white hover:bg-black/30"
                )}
              >
                <LogOutIcon className="w-4 h-4" />
                <span>Disconnect</span>
              </Button>
            </>
          ) : (
            pathname !== "/connect-wallet" &&
            pathname !== "/account-type" && (
              <Link href="/account-type">
                <Button
                  className={cn(
                    "flex items-center gap-2 h-[36px] rounded-[20px] border",
                    isDashboardPage
                      ? "border-slate-200 bg-white text-slate-950 hover:bg-slate-100"
                      : "border-white/20 bg-black/20 text-white hover:bg-black/30"
                  )}
                >
                  <LogInIcon className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </Button>
              </Link>
            )
          )}

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

      {showMobileNav && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-5 border-b">
              <Logo isDashboard={true} />
              <Button
                onClick={() => setShowMobileNav(false)}
                variant="ghost"
                className="p-0"
              >
                <XIcon className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {getMobileNavSections().map((section) => (
                <div key={section.title} className="px-5 py-4">
                  <div className="text-xs font-semibold text-[#1D2630] mb-3">
                    {section.title}
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                          isNavItemActive(item)
                            ? "bg-[#edf3ff] text-blue-600 font-medium"
                            : "text-[#5B6B79] hover:bg-gray-50 hover:text-blue-600"
                        )}
                        onClick={(e) => {
                          handleNavClick(item.href, e);
                          setShowMobileNav(false);
                        }}
                      >
                        {item.icon && <span>{item.icon}</span>}
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {isCuratorPage && isWalletConnected && isProfileComplete && (
                <div className="px-5 py-4 border-t">
                  <button
                    onClick={() => {
                      handleDisconnect();
                      setShowMobileNav(false);
                    }}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50 w-full"
                  >
                    <LockKeyhole size={18} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
