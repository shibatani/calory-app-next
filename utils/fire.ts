import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJwdmWnGEGkis5vp8sd6PHthaUH8_jb5M",
  authDomain: "calory-app-react.firebaseapp.com",
  projectId: "calory-app-react",
  storageBucket: "calory-app-react.appspot.com",
  messagingSenderId: "687254488203",
  appId: "1:687254488203:web:4936921103aac81bea408e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db