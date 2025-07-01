import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

 const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState(null);

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};

export default ChatProvider;