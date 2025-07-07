"use client";
import React from "react";

export default function WalletConnect() {
  const handleConnectWallet = () => {
    // Handle wallet connection logic here
    console.log("Connecting wallet...");
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
          As a curator, you'll be able to add and verify artisans on the
          platform. Premium curators can verify artisans for additional trust.
        </p>

        <button
          onClick={handleConnectWallet}
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
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#2563eb";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#3b82f6";
          }}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
