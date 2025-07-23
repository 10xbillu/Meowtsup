import useMessages from "@/hooks/useMessages";

function MessageList() {
  const { messages } = useMessages();

  return (
    <div className="grid gap-1">
      {messages?.map((message) => (
        <div key={message.id} className="flex items-center justify-start">
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
