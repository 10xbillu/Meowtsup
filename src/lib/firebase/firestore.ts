import type { Chat, User, Message } from "@/types/firestore";
import {
  collection,
  doc,
  endAt,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
} from "firebase/firestore";
import { auth, database } from "@lib/firebase/config";

class FirestoreService {
  static async createUser({ username, email, lastSeen, uid }: User) {
    try {
      const userRef = doc(database, "users", uid);
      await setDoc(userRef, {
        uid,
        username,
        email,
        lastSeen,
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async cretaeChat({ participants, createdAt, type }: Chat) {
    console.log(participants, createdAt, type);
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

  static fetchChats({ onUpdate }) {
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
      // const snapshot = await getDocs(q);
      // return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteChat() {}

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

  static fetchMessages({ chatId, onUpdate }) {
    const messageRef = collection(database, "chats", chatId, "messages");

    const unSubs = onSnapshot(messageRef, (snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      onUpdate(data);
    });

    return { unSubs };
  }

  static async deleteMessage() {}

  static async searchUsers({ name }) {
    console.log(name);
    try {
      const q = query(
        collection(database, "users"),
        where("uid", "!=", auth.currentUser.uid),
        orderBy("username"),
        startAt(name),
        endAt(name + "\uf8ff")
      );
      let data = [];
      data = await getDocs(q);
      console.log(data?.docs.map((data) => data.data()));
      return data?.docs.map((data) => data.data());
    } catch (error) {
      console.error(error);
    }
  }
}

export default FirestoreService;
