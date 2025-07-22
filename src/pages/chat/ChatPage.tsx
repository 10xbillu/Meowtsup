import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";
import UserSearch from "@/components/user/UserSearch";

function ChatPage() {
  return (
    <div className="grid grid-cols-[25%_auto]">
      <div className="grid grid-rows-[20%_auto]">
        <UserSearch />
        <div className="overflow-y-auto">
          <ChatList />
        </div>
      </div>
      <ChatWindow />
    </div>
  );
}

export default ChatPage;
