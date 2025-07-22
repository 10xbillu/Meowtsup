import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);


const ChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState(null);
  
  const handleActiveChat = (chat) => {
    setActiveChat(chat);
  };
  
  return (
    <ChatContext.Provider value={{ activeChat, handleActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => useContext(ChatContext);
export { ChatContext, useChat, ChatProvider };
