import { default as useChatHook } from "@/hooks/useChat";
import { useState, type FormEvent } from "react";
import { auth } from "@/lib";
import { useChat } from "@/providers/ChatProvider";

function MessageInput() {
  const { activeChat } = useChat();
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatHook();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      sendMessage({
        text: message,
        senderId: auth.currentUser?.uid,
        timestamp: "",
        chatId: activeChat.id,
      });
    }
    setMessage("");
  };
  return (
    <div>
      <form
        className="flex items-center justify-center gap-1"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-auto rounded-3xl outline-none border-none px-4 py-2 bg-neutral-800 text-neutral-50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Message @User"
        />
      </form>
    </div>
  );
}

export default MessageInput;
