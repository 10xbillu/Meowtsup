import { SearchService } from "@/repositories";
import { useEffect, useState } from "react";

export const useUserSearch = (name = "") => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (name.trim() !== "") {
      const id = setTimeout(async () => {
        const users = await SearchService.searchUserByName({ name });
        setUsers(users);
      }, 300);
      return () => clearTimeout(id);
    }
  }, [name]);
  return [users];
};