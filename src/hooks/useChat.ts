import { auth, FirestoreService } from "@/lib";
import { useEffect, useState } from "react";
import { useChat as useChatContext } from "@/providers/ChatProvider";

const useChat = () => {
  const [chats, setChats] = useState([]);
  const { activeChat } = useChatContext();
  const [messages, setMessages] = useState([]);

  const createChat = async ({ participants, createdAt, type }) => {
    await FirestoreService.cretaeChat({ participants, createdAt, type });
  };

  const fetchChats = async () => {
    const fetchedChats = await FirestoreService.fetchChats({
      uid: auth.currentUser.uid,
    });
    setChats(fetchedChats);
  };

  const fetchMessages = () => {
    if (activeChat?.id)
      console.log(activeChat)
      FirestoreService.fetchMessages({ chatId: activeChat.id });
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const sendMessage = async (message) => {
    await FirestoreService.createMessage(message);
  };

  fetchMessages();
  return {
    createChat,
    sendMessage,
    messages,
    chats,
  };
};

export default useChat;
