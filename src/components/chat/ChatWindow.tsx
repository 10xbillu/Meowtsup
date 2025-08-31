import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export const ChatWindow = () => {
  return (
    <div className="h-screen bg-neutral-800 w-full grid">
      <div className="grid grid-rows-[92%_auto] border border-neutral-800 p-4">
        <div>
          <MessageList />
        </div>
        <MessageInput />
      </div>
    </div>
  );
};
