import UserList from "../components/UserList";
import ChatList from "../components/ChatList";
import MessageList from "../components/MessageList";
import { useChat } from "../context/ChatContext";
import { sendMessage } from "../services/message.js";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../services/firebase.js";
import useMessage from "../hooks/useMessage.js";

function Chat() {
  const { chat } = useChat();
  const { register, handleSubmit, setValue } = useForm();
  const { mutate } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendMessage,
    onSuccess: () => {
      console.log("Message sent successfully");
    },
  });

  const handleSend = () => async (data) => {
    mutate({
      message: {
        ...data,
        user: auth.currentUser.displayName,
        status: "delivered",
        timestamp: Date.now(),
        typing: {
          [chat.participants[0].name]: false,
          [chat.participants[1].name]: false,
        },
      },
      chatId: chat.id,
    });
    setValue("text", "");
  };

  const [messages] = useMessage(chat?.id);

  return (
    <div className="flex h-screen">
      <div className="flex h-screen flex-col w-1/2">
        <UserList />
        <ChatList />
      </div>
      {chat ? (
        <>
          <div className="flex h-screen flex-col w-1/2">
            <div className="flex-1 overflow-y-auto p-4">
              <MessageList messages={messages} />
            </div>
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit(handleSend())} className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  {...register("text", { required: true })}
                  className="flex-1 p-2 border rounded-l-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-screen flex-col w-1/2">
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-500">
              Select a chat to start messaging
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
