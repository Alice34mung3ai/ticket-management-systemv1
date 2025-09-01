import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

// Define the shape of the user object (based on your JWT payload)
interface User {
  id: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (jwtToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({ id: decoded.id, email: decoded.email, role: decoded.role });
      } catch (err) {
        console.error("Invalid token", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, [token]);

  const login = (jwtToken: string) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    const decoded: any = jwtDecode(jwtToken);
    setUser({ id: decoded.id, email: decoded.email, role: decoded.role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
