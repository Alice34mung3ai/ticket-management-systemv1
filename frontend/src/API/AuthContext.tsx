import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchUser, logout } from "./Auth"; // adjust path if needed

interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    const loadUser = async () => {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}