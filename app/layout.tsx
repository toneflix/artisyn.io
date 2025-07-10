import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { wagmiConfig } from "../config/wagmi";
import Web3ModalProvider from "../context/Web3ModalProvider";
import { AppProvider } from "../components/comon/AppContext";
import { Header } from "@/components/comon/header";
import Footer from "@/components/landing/footer";
import { ThemeProvider } from "next-themes";
import { RoleProvider } from "@/app/context/role-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3ModalProvider initialState={initialState}>
          <AppProvider>
            <RoleProvider>
              <ThemeProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </ThemeProvider>
            </RoleProvider>
          </AppProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
