import { type LoginCredentials, type RegisterCredentials } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "@/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);
  const register = async ({
    username,
    email,
    password,
  }: RegisterCredentials) => {
    return await AuthService.register({
      username,
      email,
      password,
    });
  };

  const login = async ({ email, password }: LoginCredentials) => {
    return await AuthService.login({ email, password });
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
