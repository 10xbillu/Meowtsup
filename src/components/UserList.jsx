import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../services/auth";
import { createChat, getChats } from "../services/chat";
import { auth } from "../services/firebase.js";
import { UsersRound } from "lucide-react";

function UserList() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const { data: chats = [] } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
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
    <div className="border-b flex flex-col h-full p-4 space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <form>
            <select
              className="all-initial p-2 border rounded-lg"
              onChange={(e) => {
                const selectedUserId = e.target.value;
                const selectedUser = users.find((u) => u.id === selectedUserId);
                if (selectedUser) handleCreateChat(selectedUser);
              }}
            >
              <option selected className="text-black" value="">
                <UsersRound />
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </form>
        </>
      )}
    </div>
  );
}

export default UserList;
