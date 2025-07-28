import { default as useChatHook } from "@/hooks/useChat";
import ChatItem from "./ChatItem";

function ChatList() {
  const { chats } = useChatHook();
  return (
    <div className="border-t border-t-neutral-700">
      {chats?.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
}

export default ChatList;
