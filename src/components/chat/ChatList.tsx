import { default as useChatHook } from "@/hooks/useChat";
import { auth } from "@/lib";
import { useChat } from "@/providers/ChatProvider";

function ChatList() {
  const { handleActiveChat } = useChat();
  const { chats } = useChatHook();
  return (
    <div className="border-t border-t-neutral-700">
      {chats?.map((chat) => (
        <div
          onClick={() => handleActiveChat(chat)}
          key={chat.id}
          className="flex border-b border-b-neutral-700 hover:bg-neutral-600 transition-all items-center justify-start p-4"
        >
          {chat.participants.find(
            (participant: string) =>
              participant !== auth.currentUser?.displayName
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
