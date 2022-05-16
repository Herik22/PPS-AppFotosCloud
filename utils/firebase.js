import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-AkOVFekfR0omV3bdxMJpG3J07HhE7lk",
  authDomain: "appfotoscloud.firebaseapp.com",
  projectId: "appfotoscloud",
  storageBucket: "appfotoscloud.appspot.com",
  messagingSenderId: "552111187609",
  appId: "1:552111187609:web:8ccec0d7869611ae5d3a08",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
