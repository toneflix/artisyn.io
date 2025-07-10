"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRole } from "@/app/context/role-context";

export default function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { connectWallet, isWalletConnected, isRoleSelected, isLoading } =
    useRole();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Wait for context to load before running redirects
  useEffect(() => {
    if (!isClient || isLoading) {
      return; // Don't run redirects until context is fully loaded
    }

    if (isWalletConnected) {
      if (isRoleSelected) {
        router.replace("/profile-setup");
      } else {
        router.replace("/account-type");
      }
    }
  }, [isClient, isLoading, isWalletConnected, isRoleSelected, router]);

  const handleConnectWallet = async () => {
    if (!connectWallet) {
      console.error("Wallet connection not available");
      return;
    }

    setIsConnecting(true);

    try {
      // Simulate wallet connection - replace with actual wallet connection logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a mock address - replace with actual wallet address
      const mockAddress =
        "0x" +
        Math.random().toString(16).slice(2, 10) +
        "..." +
        Math.random().toString(16).slice(2, 6);

      // Update context with connected wallet
      connectWallet(mockAddress);

      // Redirect to account-type using replace
      router.replace("/account-type");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Show loading while context is hydrating or if redirecting
  if (!isClient || isLoading || isWalletConnected) {
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
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600">
            Connect your wallet to verify your identity and access the platform
          </p>
        </div>

        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m6-4V7a4 4 0 00-8 0v4m0 0V9a2 2 0 012-2h4a2 2 0 012 2v2"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500">
            By clicking connect, you&apos;ll be able to start and verify changes
            on the blockchain. Your wallet will open and ask you to continue.
          </p>
        </div>

        <Button
          onClick={handleConnectWallet}
          disabled={isConnecting}
          className="w-full py-3 px-6 rounded-full font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </div>
    </div>
  );
}
