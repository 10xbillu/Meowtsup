import { Route, Routes } from "react-router";
import { LoginPage, RegisterPage, HomePage, ChatPage } from "@/pages";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NotFound from "@/pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="app">
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Route>
      <Route >
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
