import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from '../seed'

const config = {
  apiKey: "AIzaSyAiQdTi37YcqnzWmH5l22QfDurOvH1hek0",
  authDomain: "react-a5eac.firebaseapp.com",
  databaseURL: "https://react-a5eac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-a5eac",
  storageBucket: "react-a5eac.appspot.com",
  messagingSenderId: "1037859949165",
  appId: "1:1037859949165:web:bbdd76cec96d4365ff8d64",
  measurementId: "G-GPS7QF3ZDB"
};

const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;

// where to call the seed file (only ONCE!)
// seedDatabase(firebase);

export {firebase, FieldValue};
