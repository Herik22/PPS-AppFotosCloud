
import firebase from './firebase'

const getUserById=(id)=>{
    const dbRef = firebase.db.collection('post').doc(id)
    const doc = await dbRef.get();

    console.log('doc')
    console.log(doc)

    const user= doc.data()
    console.log('user')
    console.log(user)
    let newUserwithId ={
        ... user,
        id:doc.id // id de cada coleccion.
    } 
}


const deletePost=async(id)=>{
    const dbRef = firebase.db.collection('post').doc(id)
    await dbRef.delete();
}
const updatePost=async(id)=>{
    const dbRef = firebase.db.collection('post').doc(id)
    await dbRef.set({
     name:'',
    user:[]
    });
}
const getCollection=async(nameCollection)=>{

    firebase.db.collection(nameCollection).onSnapshot((querySnapshot) => {
        const post = [];
        querySnapshot.docs.forEach((doc) => {
          const { name, user } = doc.data(); // destructuro el doc
          post.push({
            name: name,
            user: user,
            id: doc.id, // id del DOCUMENTO
          });
          console.log(doc.data());
        });
      });
}