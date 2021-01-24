import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVaQ9uzWLKJNMaFdqwLi7TwFt0a5e9Bnc",
    authDomain: "togedoor-cef55.firebaseapp.com",
    projectId: "togedoor-cef55",
    storageBucket: "togedoor-cef55.appspot.com",
    messagingSenderId: "122813550209",
    appId: "1:122813550209:web:fe1a8b4dfa9d488e6d0780",
    measurementId: "G-SG5MPRHHMM"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };