import UserList from "../components/UserList";
import ChatList from "../components/ChatList";
import MessageList from "../components/MessageList";
import { useChat } from "../context/ChatContext";
import { sendMessage } from "../services/message.js";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../services/firebase.js";
import useMessage from "../hooks/useMessage.js";
import { Avatar, Button, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Send } from "@mui/icons-material";

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
    <div className="grid bg-[#0A0A0A] text-[#ADADAD] rounded-l-3xl grid-cols-[20%_0.1%_auto] h-screen">
      <div className="flex  rounded-3xl overflow-y-auto flex-col">
        <UserList />
        <ChatList />
      </div>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ bgcolor: "#495057" }}
      />
      {chat ? (
        <>
          <div className="flex w-full h-screen flex-col">
            <div className="flex items-center text-[#6C757D] justify-start gap-3 p-4">
              <Avatar sx={{ width: 56, height: 56 }} />
              <h1 className="text-2xl font-bold">
                {chat.participants.find(
                  (participant) =>
                    participant.name !== auth.currentUser.displayName
                )?.name || "Chat"}
              </h1>
              <Divider flexItem sx={{ bgcolor: "#495057" }} />
            </div>
            <div className="flex-1 tex-[#6C757D] w-full overflow-y-auto p-2">
              <MessageList messages={messages} />
            </div>
            <div className=" p-4">
              <form
                className="border border-[#666666] rounded-xl grid grid-cols-[90%_auto]"
                onSubmit={handleSubmit(handleSend())}
              >
                <TextField
                  sx={{ color: "white" }}
                  id="text"
                  label="Type a message..."
                  {...register("text", { required: true })}
                  variant="outlined"
                />
                <Button onClick={handleSubmit(handleSend())} type="submit">
                  <Send />
                </Button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-screen flex-col">
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
