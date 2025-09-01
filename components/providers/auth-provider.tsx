"use client";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import LoadingScreen from "@/components/layout/LoadingScreen";

interface AuthContextType {
  user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  decodedToken: any;
}

export const AuthProvider = ({ children, decodedToken }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(decodedToken ?? null);
    setLoading(false);
  }, [decodedToken]);

  if (loading) return <LoadingScreen />;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
