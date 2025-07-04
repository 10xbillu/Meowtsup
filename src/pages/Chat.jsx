import UserList from "../components/UserList";
import ChatList from "../components/ChatList";
import MessageList from "../components/MessageList";
import { useChat } from "../context/ChatContext";
import { sendMessage } from "../services/message.js";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../services/firebase.js";
import useMessage from "../hooks/useMessage.js";
import SearchBox from "../components/SearchBox.jsx";
import { Avatar } from "@mui/material";

function Chat() {
  const { chat } = useChat();
  const { register, handleSubmit, setValue } = useForm();
  const { mutate } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendMessage,
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
    <div className="grid bg-[#343A40] rounded-3xl grid-cols-[20%_auto] h-screen">
      <div className="flex  rounded-3xl overflow-y-auto flex-col">
        <div className="flex items-center">
          <SearchBox />
          <UserList />
        </div>
        <ChatList />
      </div>
      {chat ? (
        <>
          <div className="rounded-3xl flex w-full h-screen flex-col">
            <div className="flex items-center -b justify-start gap-3 p-4">
              <Avatar sx={{ width: 56, height: 56 }}>A</Avatar>
              <h1 className="text-2xl font-bold">
                {chat.participants.find(
                  (participant) =>
                    participant.name !== auth.currentUser.displayName
                )?.name || "Chat"}
              </h1>
            </div>
            <div className="flex-1 w-full overflow-y-auto p-2">
              <MessageList messages={messages} />
            </div>
            <div className=" p-4">
              <form onSubmit={handleSubmit(handleSend())} className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  {...register("text", { required: true })}
                  className="flex-1 p-2 rounded-l-lg focus:outline-none"
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
