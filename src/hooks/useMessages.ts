import { useChat } from "@/providers/ChatProvider";
import { MessageService } from "@/repositories";
import { useEffect, useState } from "react";

const useMessages = () => {
  const { activeChat } = useChat();
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    await MessageService.createMessage(message);
  };

  useEffect(() => {
    const { unSubs } = MessageService.fetchAllMessagesByChatId({
      chatId: activeChat.id,
      onUpdate: (messages) => setMessages(messages),
    });
    return unSubs;
  }, [activeChat?.id]);

  return { sendMessage, messages };
};

export default useMessages;
