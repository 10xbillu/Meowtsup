import useMessages from "@/hooks/useMessages";

function MessageList() {
  const { messages } = useMessages();

  return (
    <div className="grid gap-2">
      {messages?.map((message) => (
        <div key={message.id} className="flex items-center justify-start ">
          <div className="w-10 mr-4 bg-neutral-700 flex items-center justify-center text-3xl font-semibold h-10 rounded-full">
            {message.sender.name[0]}
          </div>
          <div>
            <p className="text-lg text-neutral-200 font-semibold tracking-normal">
              {message.sender.name}
            </p>
            <p className="text-neutral-100 tracking-tight text-sm">
              {message.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
