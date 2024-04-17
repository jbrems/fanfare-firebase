import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../firebase.config.mjs'
import { fanfaarsFirebaseConfig } from '../../fanfaars-firebase.config.mjs'
import { getFirestore } from "firebase/firestore";

export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' && getAnalytics(app);

const fanfaarsApp = initializeApp(fanfaarsFirebaseConfig, 'fanfaars')
export const db = getFirestore(fanfaarsApp)