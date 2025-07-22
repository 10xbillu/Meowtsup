import useChat from "@/hooks/useChat";
import React from "react";

function MessageList() {
  const { messages } = useChat();
  return (
    <div>
      {messages?.map((message) => (
        <div>hii</div>
      ))}
    </div>
  );
}

export default MessageList;
