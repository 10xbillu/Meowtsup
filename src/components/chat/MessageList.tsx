import { useMessages } from "@/hooks";
import MessageItem from "./MessageItem";
import type { Message } from "@/types/firestore";

function MessageList() {
  const { messages } = useMessages();

  return (
    <div className="grid gap-2">
      {messages?.map((message: Message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
