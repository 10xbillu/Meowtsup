import { Search } from "lucide-react";
import UserList from "./UserList";
import useUserSearch from "@/hooks/useUserSearch";
import { useState } from "react";

function UserSearch() {
  const [name, setName] = useState("");
  const [users] = useUserSearch(name);

  return (
    <div>
      <div>
        <form className="w-full p-2 h-full flex items-center align-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-neutral-700 px-4 py-3 w-full rounded-3xl outline-none border-none"
            type="text"
            placeholder={"Search"}
          />
        </form>
      </div>
      <div className="relative">
        <UserList users={name !== "" ? users : []} />
      </div>
    </div>
  );
}

export default UserSearch;
