import { useState, type FormEvent } from "react";
import { auth } from "@/lib";
import { useChat } from "@/providers/ChatProvider";
import useMessages from "@/hooks/useMessages";

function MessageInput() {
  const { activeChat } = useChat();
  const [message, setMessage] = useState("");
  const { sendMessage } = useMessages();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      sendMessage({
        text: message,
        sender: {
          name: auth.currentUser?.displayName,
        },
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
