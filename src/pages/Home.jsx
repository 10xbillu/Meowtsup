import { Link } from "react-router";
import { useUser } from "../context/UserContext";

function Home() {
  const { user } = useUser();
  return (
    <div className="text-black p-4">
      {!user ? (
        <>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
          <br />
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
          <br />
        </>
      ) : (
        <>
          <Link to="/chat" className="text-blue-500 hover:underline">
            Chat
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
