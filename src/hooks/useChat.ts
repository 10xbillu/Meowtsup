import { ChatService } from "@/repositories";
import { useEffect, useState } from "react";

const useChat = () => {
  const [chats, setChats] = useState([]);

  const createChat = async ({ participants, createdAt, type }) => {
    await ChatService.createChat({ participants, createdAt, type });
  };

  useEffect(() => {
    const unSubs = ChatService.fetchAllChatsByChatId({
      onUpdate: (data) => setChats(data),
    });
    return unSubs;
  }, []);

  return {
    createChat,
    chats,
  };
};

export default useChat;
