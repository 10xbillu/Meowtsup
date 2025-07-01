import { onValue, ref, off } from "firebase/database";
import { rtdb } from "../services/firebase.js";
import { useEffect, useState } from "react";

const useMessage = (chatId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId) return;

    const messageRef = ref(rtdb, `chats/${chatId}/messages`);
    onValue(messageRef, (snapshot) => {
      setMessages(snapshot.val());
    });
    return () => off(messageRef);
  }, [chatId]);
  return [messages];
};

export default useMessage;
