import useMessages from "@/hooks/useMessages";

function MessageList() {
  const { messages } = useMessages();

  return (
    <div className="grid gap-2">
      {messages?.map((message) => (
        <div
          key={message.id}
          className="flex flex-col items-start justify-start "
        >
          <p className="text-lg text-neutral-200 font-semibold tracking-normal">
            {message.sender.name}
          </p>
          <div>
            <p className="text-neutral-100 tracking-tight text-sm">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
