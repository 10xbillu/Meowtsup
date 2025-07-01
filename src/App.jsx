import { Outlet, useNavigate } from "react-router";
import { logout } from "./services/auth";
import { useUser } from "./context/UserContext";

function App() {
  const { user } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex flex-row w-screen h-screen">
      {user && (
        <button
          onClick={handleLogout}
          className="bg-blue-500 my-20 mx-5 inline h-14 text-white p-2 rounded"
        >
          logout
        </button>
      )}
      <Outlet />
    </div>
  );
}

export default App;
