import { useChat } from "../context/ChatContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChats } from "../services/chat";
import { useEffect } from "react";
import { auth } from "../services/firebase.js";

function ChatList() {
  const { chat, setChat } = useChat();
  const queryClient = useQueryClient();
  const { data: chats = [], isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  useEffect(() => {
    console.log("Current chat:", chat);
  }, [chat]);
  useEffect(() => {
    console.log("Chats:", chats);
  }, [chats]);
  const handleChat = () => setChat(chatItem);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ul className="space-y-4">
          <li className="font-bold text-lg">Select a Chat</li>
          <li className="font-bold text-lg">Chats</li>
          {chats?.map((chatItem) => (
            <li
              key={chatItem.id}
              onClick={handleChat}
              className={`cursor-pointer p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors ${
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
