import firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyCnlpD5DSecqNQzgwwUUbW-BZyz-FuIlb0",
  authDomain: "foodey-63192.firebaseapp.com",
  projectId: "foodey-63192",
  storageBucket: "foodey-63192.appspot.com",
  messagingSenderId: "1056375278651",
  appId: "1:1056375278651:web:5784ec975990b10c65a01e",
  measurementId: "G-G77NTF3JMK"
};


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth ();
const db = firebase.firestore ();


export {auth, firebase, db};