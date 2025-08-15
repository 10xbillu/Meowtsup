import { ChatHeader } from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function ChatWindow() {
  return (
    <div className="h-screen w-full grid border-l border-l-neutral-700">
      <div className="grid grid-rows-[90%_auto] border border-neutral-800 p-4">
        <div>
          <ChatHeader />
          <MessageList />
        </div>
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatWindow;
