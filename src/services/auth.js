import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase.js";
import { db } from "./firebase.js";
import { collection, where, addDoc, getDocs, query } from "firebase/firestore";

export const signup = async ({ name, email, password }) => {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(data.user, { displayName: name });
    const usersCollRef = collection(db, "users");
    const docRef = await addDoc(usersCollRef, {
      uid: data.user.uid,
      name: data.user.displayName,
      lastSeen: null,
    });
    return data.user.uid;
  } catch (error) {
    console.log("Signup failed:", error);
  }
};

export const login = async ({ email, password }) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.uid;
  } catch (error) {
    console.log("Login failed:", error);
  }
};

export const logout = async () => {
  console.log(auth.currentUser.displayName);
  await auth.signOut();
  console.log("User logged out");
};

export const getUsers = async () => {
  try {
    const queryChats = query(
      collection(db, "chats"),
      where("participants", "array-contains", auth.currentUser.uid)
    );
    const chatsSnapshot = await getDocs(queryChats);
    const chatsList = chatsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const userQuery = query(
      collection(db, "users"),
      where("uid", "!=", auth.currentUser.uid)
    );

    const users = await getDocs(userQuery);
    const usersList = users?.docs?.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredUsers = usersList.filter(
      (user) => !chatsList.some((chat) => chat.participants.includes(user.uid))
    );
    return filteredUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
