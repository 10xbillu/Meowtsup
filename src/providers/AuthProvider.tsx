import { type LoginCredentials, type RegisterCredentials } from "@/types/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import AuthService from "@/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib";
import type { User } from "@/types/firestore";

interface AuthContextProps {
  currentUser: User | undefined;
  login: (data: LoginCredentials) => Promise<any>;
  register: (data: RegisterCredentials) => Promise<any>;
  logout: () => Promise<any>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const register = async (data: RegisterCredentials) => {
    return await AuthService.register(data);
  };

  const login = async (data: LoginCredentials) => {
    return await AuthService.login(data);
  };

  const logout = async () => {
    return await AuthService.logout();
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth, AuthProvider };
