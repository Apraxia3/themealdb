// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARYtGtNDO5v5ml19VPTNCEDxSFg4kLZ08",
  authDomain: "themealapp-58954.firebaseapp.com",
  projectId: "themealapp-58954",
  storageBucket: "themealapp-58954.appspot.com",
  messagingSenderId: "440299876268",
  appId: "1:440299876268:web:318ed4cd39c994c113d409"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};
