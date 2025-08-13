import { auth } from "@/lib";
import { useChat } from "@/providers/ChatProvider";
import { Link } from "react-router";

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
    >
      <Link className="flex border-b border-b-neutral-700 hover:bg-neutral-600 transition-all items-center justify-start p-3" to={chat.id}>
        <div className="w-10 mr-4 flex items-center justify-center text-3xl font-semibold h-10 bg-neutral-700 rounded-full">
          {otherParticipant[0]}
        </div>
        <p>{otherParticipant}</p>
      </Link>
    </div>
  );
}

export default ChatItem;
