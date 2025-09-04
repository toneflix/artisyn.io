"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AlertCircleIcon, CreditCardIcon, XCircleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  curatorNavItems,
  accountNavItems,
} from "@/components/comon/navigation";
import { useNavigation } from "@/hooks/use-navigation";
import { cn } from "@/lib/utils";
import check from "../../public/check.svg";
import Image from "next/image";

interface CuratorLayoutProps {
  children: React.ReactNode;
}

export default function CuratorLayout({
  children,
}: CuratorLayoutProps): React.ReactNode {
  const { isSidebarItemActive } = useNavigation();
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="flex w-full h-full items-start relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[238px_1fr] xl:grid-cols-[238px_1fr_350px] w-full flex-1 overflow-hidden">
        <aside className="hidden lg:flex flex-col h-full bg-white border-r border-[#e6ebf2] overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="px-[15px] py-3">
              <div className="text-xs font-semibold text-[#1D2630]">
                CURATOR
              </div>
            </div>

            {curatorNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-[15px] py-3 mx-2 rounded-lg transition-colors",
                  isSidebarItemActive(item.href)
                    ? "bg-[#edf3ff] text-blue-600"
                    : "text-[#5B6B79] hover:bg-gray-50 hover:text-blue-600"
                )}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}

            <div className="px-[15px] py-3 mt-4">
              <div className="text-xs font-semibold text-[#1D2630]">
                ACCOUNT
              </div>
            </div>

            {accountNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-[15px] py-3 mx-2 rounded-lg transition-colors",
                  isSidebarItemActive(item.href)
                    ? "bg-[#edf3ff] text-blue-600"
                    : "text-[#5B6B79] hover:bg-gray-50 hover:text-blue-600"
                )}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </aside>

        <main className="w-full h-full overflow-y-auto scrollbar-hide px-5">
          {children}
        </main>

        {isPremium && (
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
                    className="rounded-full bg-[#3B82F6] border border-[#E2E8F0] px-[11px] py-[3px] text-[#F8FAFC] text-xs font-semibold leading-4"
                  >
                    premium
                  </Badge>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-[#64748B]">Expires in</h3>
                    <p className="text-[#020817]">30 days</p>
                  </div>
                  <div className="bg-[#2563EB] rounded-full py-1.5 h-[2px] w-full"></div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-[#64748B]">Verified Artisans</h3>
                    <p className="text-[#020817] font-medium">0/0</p>
                  </div>
                  <div className="bg-[#F1F5F9] rounded-full py-1.5 h-[2px] w-full"></div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-[#F0FDF4] rounded-[25px]">
                  <Image
                    src={check}
                    alt="check"
                    className="w-5 h-5 text-yellow-600 mt-0.5"
                  />
                  <div className="flex flex-col gap-1">
                    <h4 className="font-medium text-[#16A34A] text-sm leading-5">
                      Premium Benefits Active
                    </h4>
                    <p className="text-[#16A34ACC] text-sm leading-5">
                      Upgrade to premium to verify artisans and access
                      additional features.
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6">
                <Button
                  onClick={() => setIsPremium(false)}
                  className="w-full cursor-pointer h-10 bg-[#EB2C25] rounded-[20px] gap-2 hover:bg-[#EB2C25]/90 transition-colors"
                >
                  <XCircleIcon className="w-4 h-4 text-white" />
                  <span className="font-medium text-white text-sm">
                    Cancel Subscription
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {!isPremium && (
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
                <Button
                  onClick={() => setIsPremium(true)}
                  className="w-full h-10 bg-blue-600 cursor-pointer rounded-[20px] gap-2 hover:bg-blue-700 transition-colors"
                >
                  <CreditCardIcon className="w-4 h-4 text-white" />
                  <span className="font-medium text-white text-sm">
                    Upgrade to Premium
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
