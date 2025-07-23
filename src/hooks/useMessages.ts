import { FirestoreService } from "@/lib";
import { useChat } from "@/providers/ChatProvider";
import { useEffect, useState } from "react";

const useMessages = () => {
  const { activeChat } = useChat();
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    await FirestoreService.createMessage(message);
  };

  useEffect(() => {
    const { unSubs } = FirestoreService.fetchMessages({
      chatId: activeChat.id,
      onUpdate: (messages) => setMessages(messages),
    });
    return unSubs;
  }, [activeChat?.id]);

  return { sendMessage, messages };
};

export default useMessages;
