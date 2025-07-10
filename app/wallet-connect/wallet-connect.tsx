"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { useAppContext } from "../../components/comon/AppContext";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function WalletConnect() {
  const router = useRouter();
  const { setWalletConnected } = useAppContext();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const handleContinue = () => {
    setWalletConnected(true);
    router.push("/profilesetup");
  };

  const handleDisconnect = () => {
    disconnect();
    setWalletConnected(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "16px",
            lineHeight: "1.2",
          }}
        >
          Connect Your Wallet
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#6b7280",
            marginBottom: "24px",
            lineHeight: "1.5",
          }}
        >
          You need to connect your wallet to access the curator dashboard
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#6b7280",
            marginBottom: "32px",
            lineHeight: "1.6",
          }}
        >
          As a curator, you&apos;ll be able to add and verify artisans on the
          platform. Premium curators can verify artisans for additional trust.
        </p>

        {isConnected ? (
          <>
            <button
              onClick={handleContinue}
              style={{
                background: "#22c55e",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: "500",
                width: "100%",
                cursor: "pointer",
                marginBottom: "12px",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            >
              Continue
            </button>
            <button
              onClick={handleDisconnect}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "12px 32px",
                fontSize: "16px",
                fontWeight: "500",
                width: "100%",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            >
              Disconnect Wallet
            </button>
          </>
        ) : (
          <button
            onClick={() => open()}
            style={{
              background: "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "16px 32px",
              fontSize: "16px",
              fontWeight: "500",
              width: "100%",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
