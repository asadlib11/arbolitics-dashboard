"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check token on mount and after any storage changes
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("userData");
      if (token && storedUser) {
        setIsAuthenticated(true);
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
          // Handle invalid JSON by logging out
          logout();
        }
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    document.cookie = `token=${token}; path=/`;
    setIsAuthenticated(true);
    setUser(userData);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
