import { Route, Routes } from "react-router";
import { LoginPage, RegisterPage, HomePage, ChatPage } from "@/pages";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="app">
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Route>
      <Route path="auth">
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
