import ChatList from "@/components/chat/ChatList";
import { UserSearch } from "@/components/user";
import { useChat } from "@/providers/ChatProvider";
import { Outlet } from "react-router";

export function ChatPage() {
  const { activeChat } = useChat();
  return (
    <div className="grid h-screen grid-cols-[25%_auto]">
      <div className="grid bg-neutral-800 border-r border-r-neutral-700 grid-rows-[20%_auto]">
        <UserSearch />
        <div>
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