import { authentication, db } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";
const colectionUsers = "users";

const updateCurrentUser = async (uid, setProfile) => {
  const docRef = doc(db, colectionUsers, uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let auxUser = docSnap.data();
    setProfile(auxUser);
    console.log("actualizado el profile", auxUser);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return false;
  }
};

export default updateCurrentUser;
