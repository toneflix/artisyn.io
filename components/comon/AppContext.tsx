"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AppContextType {
  accountType: "curator" | "finder" | null;
  setAccountType: (type: "curator" | "finder" | null) => void;
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [accountType, setAccountTypeState] = useState<
    "curator" | "finder" | null
  >(null);
  const [walletConnected, setWalletConnected] = useState(false);

  // On mount, load accountType from localStorage
  useEffect(() => {
    const storedType = localStorage.getItem("accountType");
    if (storedType === "curator" || storedType === "finder") {
      setAccountTypeState(storedType);
    }
  }, []);

  // When setAccountType is called, update localStorage
  const setAccountType = (type: "curator" | "finder" | null) => {
    setAccountTypeState(type);
    if (type) {
      localStorage.setItem("accountType", type);
    } else {
      localStorage.removeItem("accountType");
    }
  };

  return (
    <AppContext.Provider
      value={{
        accountType,
        setAccountType,
        walletConnected,
        setWalletConnected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
