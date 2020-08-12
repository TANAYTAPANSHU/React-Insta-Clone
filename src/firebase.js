import firebase from "firebase";


const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyCHNS84lW4_ELGC63h8hUkY7Sd_khdeD6E",
    authDomain: "instagram-clone-71729.firebaseapp.com",
    databaseURL: "https://instagram-clone-71729.firebaseio.com",
    projectId: "instagram-clone-71729",
    storageBucket: "instagram-clone-71729.appspot.com",
    messagingSenderId: "274696360859",
    appId: "1:274696360859:web:c9e80e9b207a38c236c73e",
    measurementId: "G-B6JXZP6PH8"
});






const db = firebaseapp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { db, auth, storage };