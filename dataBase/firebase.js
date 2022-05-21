import firebase from "firebase";
import "firebase/firestore";

/*const firebaseConfig = {
  apiKey: "AIzaSyD-AkOVFekfR0omV3bdxMJpG3J07HhE7lk",
  authDomain: "appfotoscloud.firebaseapp.com",
  projectId: "appfotoscloud",
  storageBucket: "appfotoscloud.appspot.com",
  messagingSenderId: "552111187609",
  appId: "1:552111187609:web:8ccec0d7869611ae5d3a08",
};*/
const firebaseConfig = {
  apiKey: "AIzaSyDtOjvBWServRsk4WCFaD2HsI_P-lEd86s",
  authDomain: "appjuegos20-af69b.firebaseapp.com",
  projectId: "appjuegos20-af69b",
  storageBucket: "appjuegos20-af69b.appspot.com",
  messagingSenderId: "756720397595",
  appId: "1:756720397595:web:c1fe6a342500c8a560f7be",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default {
  firebase,
  db,
};
