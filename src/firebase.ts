// Import the functions you need from the SDKs you need
import  firebase  from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTaCdtXFyzg1-X9iYqTOCJK4eMe0BBYXM",
  authDomain: "react-to-do-dadfc.firebaseapp.com",
  projectId: "react-to-do-dadfc",
  storageBucket: "react-to-do-dadfc.appspot.com",
  messagingSenderId: "76669271191",
  appId: "1:76669271191:web:8c84ece51177cf05bc3dd2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();