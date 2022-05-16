import { firebaseApp } from "./firebase";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/firebase-firestore";
import { fileToBlob } from "./helpers";

const db = firebase.firestore(firebaseApp);
//const db = firebaseApp.firestore();

//Verifica si un usuario esta loggeado o no
export const isUserLogged = async () => {
  let isUserLogged = false;

  firebase.auth().onAuthStateChanged((user) => {
    user != null && (isUserLogged = true);
  });

  return isUserLogged;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const registerUser = async (email, password) => {
  const result = {
    statusResponse: true,
    error: null,
  };
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    (result.statusResponse = false),
      (result.error = `error con FIREBASE error: ${error}`);
  }
  return result;
};

export const logInWithEmailPassword = async (email, password) => {
  const result = {
    statusResponse: true,
    error: null,
  };
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    (result.statusResponse = false),
      (result.error = `error con FIREBASE Logeando error: ${error}`);
  }
  return result;
};

export const closeSession = () => {
  return firebase.auth().signOut();
};

//recibe la imagen, la ruta donde la quiero guardar y el nombre
export const uploadImage = async (image, path, name) => {
  const result = { statusResponses: false, error: null, url: null };
  const ref = firebase.storage().ref(path).child(name); // referencia la foto y agrega el name como NOMBRE del hijo
  const blob = await fileToBlob(image);
  try {
    await ref.put(blob); // subo la imagen
    const url = await firebase
      .storage()
      .ref(`${path}/${name}`)
      .getDownloadURL(); //obtengo la ruta de la imagen en el storage
    result.statusResponses = true;
    result.url = url;
  } catch (error) {
    result.error = error;
  }

  return result;
};

export const updateProfile = async (data) => {
  const result = {
    statusResponse: true,
    error: null,
  };
  try {
    await firebase.auth().currentUser.updateProfile(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const addDocumentWithoutId = async (collection, data) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.database.a; //db.collection(collection).add(data);
  } catch (error) {
    console.log("en el console EBASE");
    result.statusResponse = false;
    result.error = error;
  }
  /*
   
  const result = { statusResponse: true, error: null };

  try {
    await db.collection(collection).add(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
*/
  return result;
};
