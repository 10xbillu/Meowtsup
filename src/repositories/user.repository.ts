import { database } from "@/lib";
import { doc, setDoc } from "firebase/firestore";

class UserRepository {
  static async createUser({ username, email, lastSeen, uid }) {
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
}

export default UserRepository;
