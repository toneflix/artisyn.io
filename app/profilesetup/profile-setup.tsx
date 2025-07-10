"use client";
import React, { useState } from "react";
import { Wrench, Search } from "lucide-react";
import CuratorProfile from "./components/CuratorProfile";
import FinderProfile from "./components/FinderProfile";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../components/comon/AppContext";
import { useAccount } from "wagmi";

const accountTypes = [
  {
    label: "Curator",
    icon: <Wrench size={32} color="#2563eb" />,
    value: "curator",
  },
  {
    label: "Finder",
    icon: <Search size={32} color="#2563eb" />,
    value: "finder",
  },
];

export default function ProfileSetup() {
  const router = useRouter();
  const { setAccountType, accountType, setWalletConnected } = useAppContext();
  const { isConnected } = useAccount();
  const [selected, setSelected] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  // Handler to clear account type and wallet connection
  const handleReset = () => {
    setAccountType(null);
    setWalletConnected(false);
    router.replace("/profilesetup");
  };

  // Show the correct form if accountType is set and wallet is connected
  if (isConnected && accountType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleReset}
            className="mb-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Change Account Type / Disconnect
          </button>
          {accountType === "curator" && <CuratorProfile onBack={() => {}} />}
          {accountType === "finder" && <FinderProfile onBack={() => {}} />}
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    if (selected) {
      setAccountType(selected);
      router.push("/wallet-connect");
    }
  };

  const handleBack = () => {
    setShowProfile(false);
  };

  const renderSelectedProfile = () => {
    if (selected === "curator") return <CuratorProfile onBack={handleBack} />;
    if (selected === "finder") return <FinderProfile onBack={handleBack} />;
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-6 lg:p-8">
      {!showProfile ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 w-full max-w-md mx-auto">
          <h2 className="font-semibold text-xl sm:text-2xl mb-6 sm:mb-8 text-gray-900 text-center">
            Select Account Type
          </h2>

          {/* Account type buttons - responsive layout */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
            {accountTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelected(type.value)}
                className={`
                  bg-gray-50 border-2 rounded-2xl p-6 sm:p-7
                  flex flex-col items-center justify-center
                  transition-all duration-200 cursor-pointer outline-none
                  hover:bg-gray-100 active:scale-95
                  flex-1 min-h-[120px] sm:min-h-[140px]
                  ${
                    selected === type.value
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                  }
                `}
              >
                <div className="mb-2 sm:mb-3">{type.icon}</div>
                <span className="font-medium text-gray-800 text-sm sm:text-base">
                  {type.label}
                </span>
              </button>
            ))}
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`
              w-full py-3 px-6 rounded-full font-medium text-base
              transition-all duration-200 shadow-sm
              ${
                selected
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto">{renderSelectedProfile()}</div>
      )}
    </div>
  );
}
