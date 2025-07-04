import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat } from "../services/chat";
import { auth } from "../services/firebase.js";
import useUsers from "../hooks/useUsers.js";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function UserList() {
  let [users, isLoading] = useUsers();
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
    <div className="flex items-end flex-col p-4 space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 -b-2 -blue-500"></div>
        </div>
      ) : (
        <>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              <PersonAddAlt1Icon />
            </InputLabel>
            <Select
              onChange={(e) => {
                const selectedUserId = e.target.value;
                const selectedUser = users?.find(
                  (u) => u.id === selectedUserId
                );
                if (selectedUser) handleCreateChat(selectedUser);
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={<PersonAddAlt1Icon />}
              sx={{}}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </div>
  );
}

export default UserList;
