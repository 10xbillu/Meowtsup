import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useChat } from "../context/ChatContext";
import useChats from "../hooks/useChats.js";
import { auth } from "../services/firebase.js";

function ChatList() {
  // const [activeChat, setActiveChat] = useState(null);
  const { chat, setChat } = useChat();
  const [chats, isLoading] = useChats();
  const handleChat = (chatItem) => setChat(chatItem);
  return (
    <div className="flex flex-col w-full h-full space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <Box>
          <List>
            {chats.map((chatItem) => (
              <ListItemButton
                key={chatItem.id}
                onClick={() => handleChat(chatItem)}
                selected={chat?.id === chatItem?.id}
              >
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <ListItemText>
                  {chatItem.participants.find(
                    (participant) =>
                      participant.name !== auth.currentUser.displayName
                  ).name || "Unnamed Chat"}
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </div>
  );
}

export default ChatList;
