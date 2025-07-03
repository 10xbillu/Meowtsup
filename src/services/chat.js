import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import { collection, where, query, addDoc, getDocs } from "firebase/firestore";

export const createChat = async ({ name, participants, participantsIds }) => {
  try {
    const chatsCollection = collection(db, "chats");

    const queryChats = query(
      collection(db, "chats"),
      where("participantsIds", "array-contains", auth.currentUser.uid)
    );
    const chatsSnapshot = await getDocs(queryChats);
    const chatsList = chatsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const chatExists = chatsList.some(
      (chat) =>
        chat.participants
          .map((participant) => participant.uid)
          .sort()
          .join("") ===
        participants
          .map((participant) => participant.uid)
          .sort()
          .join("")
    );
    if (chatExists) {
      console.log("Chat already exists with these participants.");
      return;
    }

    const newChat = await addDoc(chatsCollection, {
      name,
      participants,
      createdAt: new Date(),
      lastMessage: null,
      participantsIds,
    });
    console.log("Chat created with ID:", newChat.id);
    console.log(
      participants.find(
        (participant) => auth.currentUser.displayName === participant.name
      ).name
    );
    return participants.find(
      (participant) => auth.currentUser.displayName !== participant.name
    ).name;
  } catch (error) {
    console.error("Error creating chat:", error);
  }
};

export const getChats = async () => {
  try {
    const queryChats = query(
      collection(db, "chats"),
      where("participantsIds", "array-contains", auth.currentUser.uid)
    );
    const chatsSnapshot = await getDocs(queryChats);
    const chatsList = chatsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return chatsList;
  } catch (error) {
    console.error("Error fetching chats:", error);
  }
};
