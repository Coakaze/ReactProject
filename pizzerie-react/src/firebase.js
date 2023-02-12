import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBSb11Zp8nCiwC08bxHTDX3HZTlNQm3IO8",
    authDomain: "react-project-38d59.firebaseapp.com",
    databaseURL: "https://react-project-38d59-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-project-38d59",
    storageBucket: "react-project-38d59.appspot.com",
    messagingSenderId: "8899992420",
    appId: "1:8899992420:web:7c8aa6808b9fd74a6d7871"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;