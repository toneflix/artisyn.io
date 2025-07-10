"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRole, Role } from "@/app/context/role-context";
import { withAuthOnly } from "@/components/auth/withAuth";

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
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Select Account Type
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Curator Option */}
          <div
            className={`cursor-pointer text-center p-6 rounded-lg border-2 transition-all ${
              selectedAccount === "curator"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleAccountSelect("curator")}
          >
            <div className="mb-4">
              <div
                className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  selectedAccount === "curator" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    selectedAccount === "curator"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
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
            className={`cursor-pointer text-center p-6 rounded-lg border-2 transition-all ${
              selectedAccount === "finder"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleAccountSelect("finder")}
          >
            <div className="mb-4">
              <div
                className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  selectedAccount === "finder" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    selectedAccount === "finder"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
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
            className={`w-full py-3 px-6 rounded-full font-medium text-white transition-all ${
              selectedAccount
                ? "bg-blue-600 hover:bg-blue-700"
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
