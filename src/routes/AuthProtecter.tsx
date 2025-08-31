import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/providers/AuthProvider";

function AuthProtecter() {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (currentUser) {
    return <Navigate to="/chat" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default AuthProtecter;
