import useChat from "@/hooks/useChat";
import { auth } from "@/lib";

function UserList({ users }) {
  const { createChat } = useChat();
  const handleCreateChat = (user) => {
    createChat({
      participants: [auth.currentUser.displayName, user.username],
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
