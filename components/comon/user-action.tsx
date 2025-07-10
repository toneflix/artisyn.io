"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOutIcon, LogInIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRole } from "@/app/context/role-context";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/hooks/use-navigation";

const WalletAddress = ({
  isDashboard,
  address,
}: {
  isDashboard: boolean;
  address: string | null;
}) => {
  if (!address) return null;
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

export const UserActions = () => {
  const { isWalletConnected, walletAddress, disconnectWallet } = useRole();
  const { isDashboardPage } = useNavigation();
  const pathname = usePathname();

  const handleDisconnect = () => {
    disconnectWallet();
    window.location.replace("/");
  };

  if (isWalletConnected) {
    return (
      <>
        <WalletAddress isDashboard={isDashboardPage} address={walletAddress} />
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
    );
  }

  if (pathname !== "/connect-wallet" && pathname !== "/account-type") {
    return (
      <Link href="/connect-wallet">
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
    );
  }

  return null;
};
