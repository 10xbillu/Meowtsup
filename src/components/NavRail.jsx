import { logout } from "../services/auth";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router";
import { Logout } from "@mui/icons-material";

function NavRail() {
  const { user } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex rounded-3xl py-6 flex-col items-center justify-between overflow-hidden h-screen ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cursor-pointer lucide lucide-cat-icon lucide-cat"
      >
        <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
        <path d="M8 14v.5" />
        <path d="M16 14v.5" />
        <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      </svg>
      {user && (
        <button onClick={handleLogout} className="h-14 p-2 rounded">
          <Logout fontSize="large" />
        </button>
      )}
    </div>
  );
}

export default NavRail;
