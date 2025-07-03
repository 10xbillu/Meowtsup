import MessageBubble from "./MessageBubble";

function MessageList({ messages = {} }) {
  return (
    <div className="flex flex-col h-full p-1">
      {messages &&
        Object.entries(messages)?.map((message) => (
          <MessageBubble message={message[1]} key={message[0]} />
        ))}
    </div>
  );
}

export default MessageList;
