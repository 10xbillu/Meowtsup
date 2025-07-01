import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../services/auth";
import { createChat } from "../services/chat";
import { auth } from "../services/firebase.js";
import { useEffect } from "react";

function UserList() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["createChat"],
    mutationFn: createChat,
    onSuccess: (name) => {
      console.log("Chat created with name:", name);
      queryClient.setQueryData(["users"], (old = []) =>
        old.filter((user) => user.name !== name)
      );
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
  const handleCreateChat = (user) => {
    mutate({
      name: null,
      participants: [
        { name: auth.currentUser.displayName, uid: auth.currentUser.uid },
        { name: user.name, uid: user.uid },
      ],
      participantsIds: [auth.currentUser.uid, user.uid],
    });
  };
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ul className="space-y-4">
          <li className="font-bold text-lg">Select a User to Chat</li>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleCreateChat(user)}
              className="cursor-pointer p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
