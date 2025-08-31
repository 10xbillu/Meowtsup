import { useAuth } from "@/providers/AuthProvider";
import { CatIcon, LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router";

export default function ChatLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex bg-neutral-800 h-screen">
      <div className="w-20 rounded-r-3xl bg-neutral-900 py-4 px-8 flex flex-col items-center justify-between">
        <CatIcon className="cursor-pointer" onClick={() => navigate("/chat")} size={40} />
        <LogOut className="cursor-pointer" onClick={() => logout()} size={40} />
      </div>
      <div className="flex-1 bg-neutral-900 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
