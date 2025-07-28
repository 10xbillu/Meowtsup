import { auth } from "@/lib";
import { useChat } from "@/providers/ChatProvider";

function ChatItem({ chat }) {
  const currentUser = auth.currentUser?.displayName;

  const otherParticipant = chat.participants.find(
    (participant) => participant !== currentUser
  );
  const { handleActiveChat } = useChat();

  return (
    <div
      onClick={() => handleActiveChat(chat)}
      key={chat.id}
      className="flex border-b border-b-neutral-700 hover:bg-neutral-600 transition-all items-center justify-start p-4"
    >
      {otherParticipant}
    </div>
  );
}

export default ChatItem;
