import { database } from "@/lib";
import type { Message } from "@/types/firestore";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";

class MessageService {
  static async createMessage({ text, sender, timestamp, chatId }: Message) {
    try {
      const messageRef = doc(collection(database, "chats", chatId, "messages"));
      await setDoc(messageRef, {
        text,
        sender,
        timestamp,
        id: messageRef.id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  static fetchAllMessagesByChatId({ chatId, onUpdate }) {
    const messageRef = collection(database, "chats", chatId, "messages");

    const unSubs = onSnapshot(messageRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      onUpdate(data);
    });

    return { unSubs };
  }

  static async deleteMessageById() {}
  static async updateMessgeById() {}
}

export default MessageService;
