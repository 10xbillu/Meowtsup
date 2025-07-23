import { auth, FirestoreService } from "@/lib";
import { useEffect, useState } from "react";

const useChat = () => {
  const [chats, setChats] = useState([]);

  const createChat = async ({ participants, createdAt, type }) => {
    await FirestoreService.cretaeChat({ participants, createdAt, type });
  };

  const fetchChats = async () => {
    const fetchedChats = await FirestoreService.fetchChats({
      uid: auth.currentUser.uid,
    });
    setChats(fetchedChats);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    createChat,
    chats,
  };
};

export default useChat;
