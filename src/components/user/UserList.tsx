import useChat from "@/hooks/useChat";
import { auth, chatExists } from "@/lib";
import toast from "react-hot-toast";

function UserList({ users }) {
  const { createChat, chats } = useChat();
  const handleCreateChat = (user) => {
    const participants = [auth.currentUser.displayName, user.username].sort();
    if (chatExists(chats, participants)) {
      return toast.error("Chat already exists");
    }
    createChat({
      participants,
      type: "direct",
      createdAt: "createdAt",
    });
  };

  return (
    <>
      <div className="absolute w-full p-1 rounded-3xl ">
        {users.map((user) => (
          <div
            onClick={() => handleCreateChat(user)}
            className="bg-neutral-800 cursor-pointer border-b border-neutral-700 p-2 hover:bg-neutral-600 w-full"
            key={user.uid}
          >
            {user.username}
          </div>
        ))}
      </div>
    </>
  );
}

export default UserList;
