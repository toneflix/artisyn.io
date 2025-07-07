import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Connect Wallet - Artisyn",
  description: "Connect your Starknet wallet to access Artisyn's decentralized marketplace",
};

export default function WalletConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {children}
      </div>
    </ThemeProvider>
  );
}
