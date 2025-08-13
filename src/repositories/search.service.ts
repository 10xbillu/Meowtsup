import { auth, database } from "@/lib";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";

class SearchService {
  static async searchUserByName({ name }: { name: string }) {
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
      return data?.docs.map((data) => data.data());
    } catch (error) {
      console.error(error);
    }
  }
}

export default SearchService;
