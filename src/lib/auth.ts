import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "./firebase";

export function signIn() {
  return signInWithRedirect(auth, new GoogleAuthProvider())
}