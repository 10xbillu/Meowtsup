import useMessages from "@/hooks/useMessages";
import MessageItem from "./MessageItem";

function MessageList() {
  const { messages } = useMessages();

  return (
    <div className="grid gap-2">
      {messages?.map((message) => (
        <MessageItem message={message} />
      ))}
    </div>
  );
}

export default MessageList;
