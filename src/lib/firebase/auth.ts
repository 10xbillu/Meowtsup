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
import { firebaseErrorHandler } from "../helper";
import { UserService } from "@/repositories";

class AuthService {
  static async register({ username, email, password }: RegisterCredentials) {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      await UserService.createUser({
        uid: userCred.user.uid,
        username,
        email,
        lastSeen: "lastSeen",
      });
    } catch (error) {
      console.error(error);
      firebaseErrorHandler(error.code);
    }
  }
  static async login({ email, password }: LoginCredentials) {
    try {
      const {
        user: { uid },
      } = await signInWithEmailAndPassword(auth, email, password);

      return uid;
    } catch (error) {
      firebaseErrorHandler(error.code);
    }
  }

  static async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      firebaseErrorHandler(error.code);
    }
  }
}

export default AuthService;
