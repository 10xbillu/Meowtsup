import { AuthProvider } from "@/providers/AuthProvider";
import AppRoutes from "@/routes/AppRoutes";
import { ChatProvider } from "./providers/ChatProvider";

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div className="h-screen w-full text-neutral-100 bg-neutral-900">
          <AppRoutes />
        </div>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
