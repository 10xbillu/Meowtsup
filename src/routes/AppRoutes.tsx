import { Route, Routes } from "react-router";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import AuthProtecter from "./AuthProtecter";
import { ChatWindow } from "@/components/chat";
import ChatLayout from "@/layout/ChatLayout";
import { HomePage, NotFound } from "@/pages";
import { ChatPage } from "@/pages/chat";
import { LoginPage, RegisterPage } from "@/pages/auth";

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
        <Route element={<ChatLayout />}>
          <Route path="chat" element={<ChatPage />}>
            <Route path=":id" element={<ChatWindow />} />
          </Route>
        </Route>
      </Route>
      <Route element={<AuthProtecter />}>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
