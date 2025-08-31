import { useChats } from "@/hooks";
import ChatItem from "./ChatItem";

function ChatList() {
  const { chats } = useChats();
  return (
    <div className="border-t border-t-neutral-700">
      {chats?.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
}

export default ChatList;
