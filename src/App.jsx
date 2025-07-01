import { Outlet } from "react-router";

import NavRail from "./components/NavRail";

function App() {
  return (
    <div className="px-4 gap-4 flex flex-row w-screen h-screen">
      <NavRail />
      <Outlet />
    </div>
  );
}

export default App;
