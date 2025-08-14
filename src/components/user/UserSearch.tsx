import UserList from "./UserList";
import useUserSearch from "@/hooks/useUserSearch";
import { useState } from "react";
import { default as useChatHook } from "@/hooks/useChat";
import { useChat } from "@/providers/ChatProvider";
import { auth, chatExists } from "@/lib";
import { useNavigate } from "react-router";

function UserSearch() {

  const [name, setName] = useState("");

  const { handleActiveChat } = useChat();

  const [users] = useUserSearch(name);

  const navigate = useNavigate();
  
  const { createChat, chats } = useChatHook();
  
  const handleCreateChat = (user) => {
    const participants = [auth.currentUser.displayName, user.username].sort();

    const chat = chatExists(chats, participants);
    if (chat) {
      handleActiveChat(chat);
      setName("");
      return navigate(`/chat/${chat.id}`);
    }

    createChat({
      participants,
      type: "direct",
      createdAt: "createdAt",
    });
    
    setName("");
  };
  
  return (
    <div>
      <div>
        <form className="w-full px-4 mt-4 mb-1 h-full flex items-center align-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-neutral-700 px-4 py-3 w-full rounded-3xl outline-none border-none"
            type="text"
            placeholder={"Search"}
          />
        </form>
        <div className="relative">
          <UserList
            onClick={handleCreateChat}
            users={name !== "" ? users : []}
          />
        </div>
      </div>
    </div>
  );
}

export default UserSearch;
