"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Role = "curator" | "finder" | null;

interface RoleContextType {
  userRole: Role;
  isRoleSelected: boolean;
  isProfileComplete: boolean;
  isWalletConnected: boolean;
  isAuthenticated: boolean; // Add this
  hasStartedProfile: boolean;
  walletAddress: string | null;
  isLoading: boolean;
  setUserRole: (role: Role) => void;
  setIsProfileComplete: (complete: boolean) => void;
  setHasStartedProfile: (started: boolean) => void;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<Role>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [hasStartedProfile, setHasStartedProfile] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved state from localStorage
    const savedRole = localStorage.getItem("userRole") as Role;
    const savedProfileComplete =
      localStorage.getItem("profileComplete") === "true";
    const savedWalletAddress = localStorage.getItem("walletAddress");
    const savedProfileStarted =
      localStorage.getItem("profileStarted") === "true";

    if (savedRole) setUserRole(savedRole);
    if (savedProfileComplete) setIsProfileComplete(true);
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
      setIsWalletConnected(true);
    }
    if (savedProfileStarted) setHasStartedProfile(true);

    setIsLoading(false);
  }, []);

  const connectWallet = (address: string) => {
    setWalletAddress(address);
    setIsWalletConnected(true);
    localStorage.setItem("walletAddress", address);
  };

  const disconnectWallet = () => {
    // Batch state updates to reduce re-renders
    setWalletAddress(null);
    setIsWalletConnected(false);
    setUserRole(null);
    setIsProfileComplete(false);
    setHasStartedProfile(false);

    // Batch localStorage operations
    const keysToRemove = [
      "walletAddress",
      "userRole",
      "profileComplete",
      "profileStarted",
      "profileFormData",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  };

  const handleSetUserRole = (role: Role) => {
    setUserRole(role);
    if (role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  };

  const handleSetIsProfileComplete = (complete: boolean) => {
    setIsProfileComplete(complete);
    localStorage.setItem("profileComplete", complete.toString());
  };

  const handleSetHasStartedProfile = (started: boolean) => {
    setHasStartedProfile(started);
    localStorage.setItem("profileStarted", started.toString());
  };

  return (
    <RoleContext.Provider
      value={{
        userRole,
        isRoleSelected: userRole !== null,
        isProfileComplete,
        isWalletConnected,
        isAuthenticated: isWalletConnected, // Base authentication is wallet connection
        hasStartedProfile,
        walletAddress,
        isLoading,
        setUserRole: handleSetUserRole,
        setIsProfileComplete: handleSetIsProfileComplete,
        setHasStartedProfile: handleSetHasStartedProfile,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
