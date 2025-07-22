import { useChat } from "@/providers/ChatProvider";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function ChatWindow() {
  const { activeChat } = useChat();

  return (
    <div className="h-screen w-full grid border-l border-l-neutral-700">
      {activeChat ? (
        <>
          <div className="grid grid-rows-[90%_auto] border border-neutral-800 p-4">
            <div>
              <MessageList />
            </div>
            <MessageInput />
          </div>
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center text-neutral-600 text-3xl italic">
          Select chat.
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
