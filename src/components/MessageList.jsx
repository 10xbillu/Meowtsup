import MessageBubble from "./MessageBubble";

function MessageList({ messages = {} }) {
  return (
    <div className="flex w-full flex-col h-full">
      {messages &&
        Object.entries(messages)?.map((message) => (
          <MessageBubble message={message[1]} key={message[0]} />
        ))}
    </div>
  );
}

export default MessageList;
