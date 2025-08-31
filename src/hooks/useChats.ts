import { ChatService } from "@/repositories";
import { useEffect, useState } from "react";

export const useChats = () => {
  const [chats, setChats] = useState([]);

  const createChat = async ({ participants, createdAt, type }) => {
    await ChatService.createChat({ participants, createdAt, type });
  };

  useEffect(() => {
    const unSubs = ChatService.fetchAllChatsByChatId({
      onUpdate: (data) => {
        setChats(data)
      },
    });
    return unSubs;
  }, []);

  return {
    createChat,
    chats,
  };
};