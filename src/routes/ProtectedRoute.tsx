import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/providers/AuthProvider";

function ProtectedRoute() {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
