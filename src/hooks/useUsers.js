import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/auth";
import useChats from "./useChats";

const useUsers = () => {
  let [chats = []] = useChats();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    select: (users) => {
      users = users?.map(
        (user) => user.name !== auth.currentUser.displayName && user
      );
      chats = chats?.map(
        (chat) =>
          chat?.participants?.find(
            (p) => p.name !== auth.currentUser.displayName
          ).name
      );
      users = users.filter((user) => !chats.includes(user.name));
    },
  });

  return [users, isLoading];
};

export default useUsers;
