import { type LoginCredentials, type RegisterCredentials } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "@/lib/firebase/auth";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib";
import { UserService } from "@/repositories";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);
  const navigate = useNavigate();
  const register = ({ username, email, password }: RegisterCredentials) => {
    AuthService.register({
      username,
      email,
      password,
    }).then((uid) => {
      UserService.createUser({
        uid,
        username,
        email,
        lastSeen: "lastSeen",
      });
      navigate("/app/chat");
    });
  };

  const login = ({ email, password }: LoginCredentials) => {
    AuthService.login({ email, password }).then(() => navigate("/app/chat"));
  };
  const logout = () => {
    AuthService.logout();
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
