import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../firebase.config.mjs'
import { fanfaarsFirebaseConfig } from '../../fanfaars-firebase.config.mjs'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const app = initializeApp(firebaseConfig);

const fanfaarsApp = initializeApp(fanfaarsFirebaseConfig, 'fanfaars')
export const auth = getAuth(fanfaarsApp)
auth.languageCode = 'nl'
export const db = getFirestore(fanfaarsApp)