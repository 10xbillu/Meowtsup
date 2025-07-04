import { Outlet } from "react-router";
import NavRail from "./components/NavRail";

function App() {
  return (
    <div className="grid grid-cols-[5%_auto] h-screen">
      <NavRail />
      <Outlet />
    </div>
  );
}

export default App;

