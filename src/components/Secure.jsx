import { Navigate } from "react-router";
import { useUser } from "../context/UserContext.jsx";

function Secure({ children }) {
  const { user } = useUser();
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return <>{children}</>;
}

export default Secure;
