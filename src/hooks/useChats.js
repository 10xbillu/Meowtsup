import { useQuery } from "@tanstack/react-query";
import { getChats } from "../services/chat";

const useChats = () => {
  const { data: chats = [], isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  return [chats, isLoading];
};

export default useChats;
