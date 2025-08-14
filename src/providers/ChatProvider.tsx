import type { Chat } from "@/types/firestore";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ChatContextInterface {
  activeChat: Chat | null;
  handleActiveChat: (chat: Chat) => void;
}

const ChatContext = createContext<ChatContextInterface | null>(null);

const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const handleActiveChat = (chat: Chat) => {
    setActiveChat(chat);
  };

  return (
    <ChatContext.Provider value={{ activeChat, handleActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  const context = useContext(ChatContext);
  if (context === null) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export { ChatContext, useChat, ChatProvider };
