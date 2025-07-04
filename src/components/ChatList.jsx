import { useChat } from "../context/ChatContext";
import useChats from "../hooks/useChats.js";
import { auth } from "../services/firebase.js";

function ChatList() {
  const { chat, setChat } = useChat();
  const [chats, isLoading] = useChats();
  const handleChat = (chatItem) => setChat(chatItem);
  return (
    <div className="flex flex-col w-full h-full space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 -b-2 -blue-500"></div>
        </div>
      ) : (
        <ul className="bg-[#495057] rounded-3xl">
          {chats?.map((chatItem) => (
            <li
              key={chatItem.id}
              onClick={() => handleChat(chatItem)}
              className={`cursor-pointer p-4 rounded-3xl bg-[#495057] w-full hover:bg-[#6C757D] transition-colors ${
                chat?.id === chatItem.id ? "bg-blue-100" : ""
              }`}
            >
              {chatItem.participants.find(
                (participant) =>
                  participant.name !== auth.currentUser.displayName
              ).name || "Unnamed Chat"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChatList;
