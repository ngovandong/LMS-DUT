// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXs_w950fYkvDLfzLzujpO_aC8nqL9L04",
  authDomain: "pbl4-31c91.firebaseapp.com",
  projectId: "pbl4-31c91",
  storageBucket: "pbl4-31c91.appspot.com",
  messagingSenderId: "664189841099",
  appId: "1:664189841099:web:69482e94f6e84d8fb4354e",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;
