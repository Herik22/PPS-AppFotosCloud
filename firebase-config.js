import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCfRif-rE5l2DjwNpXct8Dxu-BRvz3clRc",
  authDomain: "apprelevamientovisual-21736.firebaseapp.com",
  projectId: "apprelevamientovisual-21736",
  storageBucket: "apprelevamientovisual-21736.appspot.com",
  messagingSenderId: "541301158842",
  appId: "1:541301158842:web:bf3b2a90a24b0c54ef2383",
});

const authentication = firebase.auth();
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Create a storage reference from our storage service
//const storageRef = ref(storage);
export { authentication, firebase, app, db, storage };
