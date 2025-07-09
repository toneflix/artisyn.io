"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRole } from "@/app/context/role-context";

export default function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const roleContext = useRole();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleConnectWallet = async () => {
    if (!roleContext?.connectWallet) {
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
      roleContext.connectWallet(mockAddress);

      // Redirect to profile setup
      router.push("/profile-setup");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Don't render until we're on the client
  if (!isClient) {
    return null;
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
