import { auth, database } from "@/lib";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";

class ChatService {
  static async createChat({ participants, createdAt, type }) {
    try {
      const chatRef = doc(collection(database, "chats"));
      await setDoc(chatRef, {
        participants,
        createdAt,
        type,
        id: chatRef.id,
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  static fetchAllChatsByChatId({ onUpdate }) {
    try {
      const q = query(
        collection(database, "chats"),
        where("participants", "array-contains", auth.currentUser?.displayName)
      );

      const unSubs = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        onUpdate(data);
      });
      return unSubs;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteChatById() {}
  static async updateChatById() {}
}

export default ChatService;
