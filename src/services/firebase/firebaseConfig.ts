
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWwURs9T1pK5KolL41RN71uNyMjtPOw2I",
  authDomain: "curriculo-saas.firebaseapp.com",
  projectId: "curriculo-saas",
  storageBucket: "curriculo-saas.appspot.com",
  messagingSenderId: "322685379988",
  appId: "1:322685379988:web:aaad7d2113551d9b9edb81",
  measurementId: "G-PHEZTH0LYT"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
