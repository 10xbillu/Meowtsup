import { FirestoreService } from "@/lib";
import { useEffect, useState } from "react";

const useUserSearch = (name = "") => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (name.trim() !== "") {
      const id = setTimeout(async () => {
        const response = await FirestoreService.searchUsers({ name });
        setUsers(response);
        console.log("Searching");
      }, 300);
      return () => clearTimeout(id);
    }
  }, [name]);
  return [users];
};

export default useUserSearch;
