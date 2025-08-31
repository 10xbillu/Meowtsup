import { database } from "@/lib";
import type { Message } from "@/types/firestore";
import { collection, doc, onSnapshot, setDoc, orderBy, Timestamp, query } from "firebase/firestore";

class MessageService {
  static async createMessage({ text, sender, chatId }: Message) {
    try {
      const messageRef = doc(collection(database, "chats", chatId, "messages"));
      await setDoc(messageRef, {
        text,
        sender,
        timestamp: Timestamp.now(),
        id: messageRef.id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  static fetchAllMessagesByChatId({ chatId, onUpdate }) {
    const messageRef = collection(database, "chats", chatId, "messages");

    const q = query(messageRef, orderBy("timestamp", "asc")); 

    const unSubs = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      onUpdate(data);
    });

    return { unSubs };
  }

}

export default MessageService;
