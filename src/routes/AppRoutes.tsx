import { Route, Routes } from "react-router";
import { LoginPage, RegisterPage, HomePage, ChatPage } from "@/pages";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import { useAuth } from "@/providers/AuthProvider";
import ChatWindow from "@/components/chat/ChatWindow";

function AppRoutes() {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-6xl font-extrabold text-neutral-50">
        Loading...
      </div>
    );
  }
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
          <Route path="chat" element={<ChatPage />}>
            <Route path=":id" element={<ChatWindow />} />
          </Route>
      </Route>
      <Route>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
