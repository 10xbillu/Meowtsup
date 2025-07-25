import { auth, FirestoreService } from "@/lib";
import { useEffect, useState } from "react";

const useChat = () => {
  const [chats, setChats] = useState([]);

  const createChat = async ({ participants, createdAt, type }) => {
    await FirestoreService.cretaeChat({ participants, createdAt, type });
  };

  useEffect(() => {
    const unSubs = FirestoreService.fetchChats({
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
