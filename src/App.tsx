import { AuthProvider } from "@/providers/AuthProvider";
import AppRoutes from "@/routes/AppRoutes";
import { ChatProvider } from "./providers/ChatProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div className="h-screen w-full text-neutral-100 bg-neutral-900">
          <AppRoutes />
          <Toaster position="top-center"/>
        </div>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
