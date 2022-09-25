import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import ColorsPPS from "../../utils/ColorsPPS";
import updateCurrentUser from "../../dataBase/newServicesFB";
import uuidv4 from "random-uuid-v4";
import { useLogin } from "../../context/LoginProvider";
import { db, app } from "../../firebase-config";
/******* */
import { setDoc, doc } from "firebase/firestore";

export default ModalGuardarFoto = (props) => {
  const { url, setModal, modal, setLoading, navigation } = props;
  const { profile, setProfile, photosGood } = useLogin();
  const nameCollection = `post${photosGood ? "Buenos" : "Malos"}`;
  const nameStorage = `fotos${photosGood ? "Buenas" : "Malas"}`;
  useEffect(() => {
    updateCurrentUser(profile.uid, setProfile).then((value) => {});
  }, []);

  const pruebaCrearColeccion = async () => {
    try {
      const docRef = await setDoc(doc(db, "users", "eleganteKLk"), {
        first: "970",
        last: "PATROM",
        born: 420,
      });
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const pruebaSubirFoto = async () => {
    let path = "FOtosPrueba";
    let fileName = "cUALQUIERA2";

    const response = await fetch(url);
    const blob = await response.blob();

    var ref = app.storage().ref(path).child(fileName).put(blob);
    try {
      await ref;

      /**OBTENER URL */
      const url = await app
        .storage()
        .ref(`${path}/${fileName}`)
        .getDownloadURL(); //obtengo la ruta de la imagen en el storage

      console.log("url obtenido", url);
    } catch (error) {
      console.log("error prueba subir", error);
    }
    console.log("se subio");
  };

  let subirImgFB = async (path, name) => {
    const result = { statusResponses: false, error: null, url: null };

    const response = await fetch(url);
    const blob = await response.blob();

    var ref = app.storage().ref(path).child(name).put(blob);

    try {
      await ref;
      /**OBTENER URL */
      const url = await app.storage().ref(`${path}/${name}`).getDownloadURL(); //obtengo la ruta de la imagen en el storage

      result.statusResponses = true;
      result.url = url;
      console.log("url obtenido", url);
    } catch (error) {
      console.log("error prueba subir", error);
      result.error = error;
    }

    return result;
  };
  const actualizarFotosUsuario = async (uid, data) => {
    let objGod = {
      ...profile,
      fotosLindas: data,
    };
    let objBad = {
      ...profile,
      fotosMalas: data,
    };
    console.log("OBJETO actualizarFotosUsuario", photosGood ? objGod : objBad);
    try {
      await setDoc(doc(db, "users", uid), photosGood ? objGod : objBad);
      console.log("Document ACTUALIZADO");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const guardarFoto = () => {
    setLoading(true);

    let idPhoto = uuidv4();
    subirImgFB(nameStorage, idPhoto).then(async (data) => {
      let fecha = new Date();
      let hoy = fecha.toLocaleDateString();

      /* Crear documento sobre la imagen. */
      await setDoc(doc(db, nameCollection, idPhoto), {
        idCreador: profile.uid,
        likes: [],
        url: data.url,
        autorName: profile.name,
        fecha: hoy,
        id: idPhoto,
      });

      //actualizo los datos del usuario
      updateCurrentUser(profile.uid, setProfile).then((value) => {
        let fotosUser = photosGood ? profile.fotosLindas : profile.fotosMalas;
        fotosUser.push({ url: data.url });
        actualizarFotosUsuario(profile.uid, fotosUser).then((value) => {
          setLoading(false);
          navigation.navigate("Photos");
        });
      });
    });
  };

  return (
    <Modal animationType="slide" transparent={false} visible={modal}>
      <View style={styles.imgContainer}>
        <View style={styles.header}>
          <FontAwesome name="camera-retro" size={60} color={ColorsPPS.morado} />
          <Text style={styles.titulo}>Muy bien!</Text>
          <Text style={styles.subtitulo}>¿Que te gustaría hacer?</Text>
        </View>
        <Image
          style={styles.photo}
          source={{
            uri: url
              ? url
              : "https://pps.whatsapp.net/v/t61.24694-24/219330882_1210229649784080_1447255924545198206_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=7b6414363954e7e5d59cfbe8e00f55fb&oe=6293F7AD",
          }}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => setModal(false)}
            style={styles.btnCancel}
          >
            <Text style={styles.btnText}>Sacar de nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSave}
            onPress={() => {
              guardarFoto();
              //pruebaSubirFoto();
            }}
          >
            <Text style={styles.btnText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    bottom: 40,
  },
  headerImg: {
    width: 300,
    height: 200,
    marginTop: 40,
  },
  titulo: {
    fontSize: 35,
    fontWeight: "bold",
    color: ColorsPPS.amarillo,
  },
  subtitulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: ColorsPPS.amarillo,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
  },
  camera: {
    flex: 1,
  },
  button: {
    position: "absolute",
    left: 20,
    backgroundColor: "white",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    bottom: 20,
    paddingVertical: 5,
  },
  btnPhoto: {
    position: "absolute",
    right: 20,
    backgroundColor: "white",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    bottom: 20,
    paddingVertical: 5,
  },
  photo: {
    width: "100%",
    height: "60%",
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  btnCancel: {
    backgroundColor: ColorsPPS.morado,
    height: Dimensions.get("window").height * 0.08,
    borderRadius: 20,
    width: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    borderBottomStartRadius: 10,
  },
  btnSave: {
    backgroundColor: ColorsPPS.amarillo,
    height: Dimensions.get("window").height * 0.08,
    borderRadius: 20,
    width: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 10,
  },
  btnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  btnText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
