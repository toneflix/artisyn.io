import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { wagmiConfig } from "../config/wagmi";
import Web3ModalProvider from "../context/Web3ModalProvider";
import { AppProvider } from "../components/comon/AppContext";

export const metadata: Metadata = {
  title: "Artisyn.io",
  description: "Artisyn Web3 Onboarding",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const initialState = cookieToInitialState(
    wagmiConfig,
    headersList.get("cookie")
  );
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
          <AppProvider>
            {children}
          </AppProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
