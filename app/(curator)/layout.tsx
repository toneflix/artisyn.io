"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertCircleIcon,
  UserIcon,
  Home,
  Package,
  ListPlus,
  Files,
  PaintbrushVerticalIcon,
  LockKeyhole,
  BoltIcon,
  CreditCardIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CuratorLayoutProps {
  children: React.ReactNode;
}

export default function CuratorLayout({
  children,
}: CuratorLayoutProps): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();

  const curatorMenuItems = [
    {
      icon: <Home size={18} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    { icon: <ListPlus size={18} />, label: "Listings", path: "/listings" },
    { icon: <UserIcon size={18} />, label: "Profile", path: "/profile" },
    { icon: <Package size={18} />, label: "Archive", path: "/archive" },
  ];

  const accountMenuItems = [
    {
      icon: <BoltIcon size={18} />,
      label: "Account Settings",
      path: "/account-settings",
    },
    { icon: <Files size={18} />, label: "Saved", path: "/saved" },
    {
      icon: <PaintbrushVerticalIcon size={18} />,
      label: "History",
      path: "/history",
    },
    { icon: <LockKeyhole size={18} />, label: "Logout", path: "/" },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full h-screen items-start relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[238px_1fr] w-full h-full overflow-hidden">
        <aside className="hidden lg:flex flex-col h-full bg-white border-r border-[#e6ebf2] overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="px-[15px] py-3">
              <div className="text-xs font-semibold text-[#1D2630]">
                CURATOR
              </div>
            </div>

            {curatorMenuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={`curator-${index}`}
                  href={item.path}
                  className={`flex items-center gap-2.5 px-[15px] py-3 mx-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#edf3ff] text-blue-600"
                      : "text-[#5B6B79] hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className={`text-sm `}>{item.label}</span>
                </Link>
              );
            })}

            <div className="px-[15px] py-3 mt-4">
              <div className="text-xs font-semibold text-[#1D2630]">
                ACCOUNT
              </div>
            </div>

            {accountMenuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={`account-${index}`}
                  href={item.path}
                  onClick={item.label === "Logout" ? handleLogout : undefined}
                  className={`flex items-center gap-2.5 px-[15px] py-3 mx-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#edf3ff] text-blue-600"
                      : "text-[#5B6B79] hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  <span className="">{item.icon}</span>
                  <span className={`text-sm `}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-2 px-5 h-full overflow-hidden">
          <main className="w-full h-full overflow-y-auto scrollbar-hide">
            {children}
          </main>

          <div className="hidden xl:block w-[342px] mx-auto mt-20 h-full overflow-hidden">
            <Card className="w-full rounded-[25px] border p-0 border-solid bg-white border-slate-200 shadow-[0px_1px_2px_#0000000d]">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold tracking-[-0.60px] leading-6 text-gray-900">
                  Subscription
                </CardTitle>
                <CardDescription className=" text-gray-600 pt-1">
                  Your current subscription status
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col w-full gap-6 pb-0">
                <div className="flex items-center justify-between w-full">
                  <div className="font-medium text-base text-gray-900">
                    Current Plan
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full border border-[#E2E8F0] px-[11px] py-[3px] text-[#020817] text-xs font-semibold leading-4"
                  >
                    Free
                  </Badge>
                </div>

                <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-[25px]">
                  <AlertCircleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <h4 className="font-medium text-yellow-600 text-sm leading-5">
                      Free Plan Limitations
                    </h4>
                    <p className="text-yellow-600 text-sm leading-5">
                      Upgrade to premium to verify artisans and access
                      additional features.
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6">
                <Button className="w-full h-10 bg-blue-600 rounded-[20px] gap-2 hover:bg-blue-700 transition-colors">
                  <CreditCardIcon className="w-4 h-4 text-white" />
                  <span className="font-medium text-white text-sm">
                    Upgrade to Premium
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
