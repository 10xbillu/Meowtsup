import ChatList from "@/components/chat/ChatList";
import UserSearch from "@/components/user/UserSearch";
import { useChat } from "@/providers/ChatProvider";
import { Outlet } from "react-router";

function ChatPage() {
  const { activeChat } = useChat();
  return (
    <div className="grid h-screen grid-cols-[25%_auto]">
      <div className="grid grid-rows-[20%_auto]">
        <UserSearch />
        <div className="boder">
          <ChatList />
        </div>
      </div>
      {!activeChat ? (
        <div className="h-full w-full bg-neutral-800 flex items-center justify-center text-neutral-600 text-3xl italic">
          Select chat.
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default ChatPage;
