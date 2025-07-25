import { SearchService } from "@/repositories";
import { useEffect, useState } from "react";

const useUserSearch = (name = "") => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (name.trim() !== "") {
      const id = setTimeout(async () => {
        const response = await SearchService.searchUserByName({ name });
        setUsers(response);
      }, 300);
      return () => clearTimeout(id);
    }
  }, [name]);
  return [users];
};

export default useUserSearch;
