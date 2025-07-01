import { ref, set, onValue } from "firebase/database";
import { rtdb } from "./firebase.js";

export const sendMessage = async ({ message, chatId }) => {
  const messageRef = ref(
    rtdb,
    "chats/" + `${chatId}/` + "messages/" + Date.now()
  );
  await set(messageRef, message);
};
