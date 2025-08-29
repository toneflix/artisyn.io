"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRole, Role } from "@/app/context/role-context";
import { withAuthOnly } from "@/components/auth/withAuth";
import repair from "@/public/repair.svg";
import finder from "@/public/search.svg";
import Image from "next/image";

function AccountType() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const router = useRouter();
  const { setUserRole, isWalletConnected, isRoleSelected, isLoading } =
    useRole();

  useEffect(() => {
    if (isLoading) {
      return; // Don't run redirects until context is fully loaded
    }

    if (!isWalletConnected) {
      router.replace("/connect-wallet");
      return;
    }
    if (isRoleSelected) {
      router.replace("/profile-setup");
    }
  }, [isLoading, isWalletConnected, isRoleSelected, router]);

  const handleAccountSelect = (accountType: string) => {
    setSelectedAccount(accountType);
  };

  const handleContinue = () => {
    if (selectedAccount) {
      setUserRole(selectedAccount as Role);
      router.replace("/profile-setup");
    }
  };

  if (isLoading || !isWalletConnected || isRoleSelected) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full border-2 border-[#E2E8F0] rounded-3xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#020817] mb-16">
            Select Account Type
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-16">
          {/* Curator Option */}
          <div
            className={`cursor-pointer text-center p-6 rounded-2xl border-[1.5px] transition-all ${
              selectedAccount === "curator"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleAccountSelect("curator")}
          >
            <div className="mb-4">
              <div
                className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  selectedAccount === "curator"
                    ? "bg-[#F0FDF4]"
                    : "bg-[#F8FAFC]"
                }`}
              >
                <Image src={repair} alt="repair" width={24} height={24} />
              </div>
            </div>
            <h3
              className={`font-medium ${
                selectedAccount === "curator"
                  ? "text-blue-700"
                  : "text-gray-900"
              }`}
            >
              Curator
            </h3>
          </div>

          {/* Finder Option */}
          <div
            className={`cursor-pointer text-center p-6 rounded-2xl border-[1.5px] transition-all ${
              selectedAccount === "finder"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleAccountSelect("finder")}
          >
            <div className="mb-4">
              <div
                className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  selectedAccount === "finder" ? "bg-[#F0FDF4]" : "bg-[#F8FAFC]"
                }`}
              >
                <Image src={finder} alt="finder" width={24} height={24} />
              </div>
            </div>
            <h3
              className={`font-medium ${
                selectedAccount === "finder" ? "text-blue-700" : "text-gray-900"
              }`}
            >
              Finder
            </h3>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedAccount}
            className={`w-full py-6 px-6 mt-2 cursor-pointer rounded-full font-medium text-[#F8FAFC] transition-all ${
              selectedAccount
                ? "bg-[#2563EB] hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withAuthOnly(AccountType);
