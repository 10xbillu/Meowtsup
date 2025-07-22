import { auth } from "./config";
import {
  type RegisterCredentials,
  type LoginCredentials,
} from "../../types/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

class AuthService {
  static async register({ username, email, password }: RegisterCredentials) {
    try {
      // await validatePassword(auth, password);
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      return userCred.user.uid;
    } catch (error) {
      console.error(error);
    }
  }
  static async login({ email, password }: LoginCredentials) {
    try {
      const {
        user: { uid },
      } = await signInWithEmailAndPassword(auth, email, password);

      return uid;
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        throw new Error("User not found");
      }
      console.dir(error.code);
    }
  }

  static async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthService;
