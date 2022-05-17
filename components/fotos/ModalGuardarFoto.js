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
import React, { Component, useState, useRef, useEffect } from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import ColorsPPS from "../../utils/ColorsPPS";
import firebase from "../../dataBase/firebase";
import { fileToBlob } from "../../utils/helpers";
import { result } from "lodash";
import uuidv4 from "random-uuid-v4";
import { useLogin } from "../../context/LoginProvider";

export default ModalGuardarFoto = (props) => {
  const { url, setModal, modal, setLoading, navigation } = props;
  const { profile, setProfile } = useLogin();

  useEffect(() => {
    console.log(profile);
  }, []);
  let subirImgFB = async (
    image = "false",
    path = "fotosBuenas",
    name = "namefoto"
  ) => {
    const result = { statusResponses: false, error: null, url: null };

    const ref = firebase.firebase.storage().ref(path).child(name);
    const blob = await fileToBlob(image);

    try {
      await ref.put(blob); // subo la imagen
      const url = await firebase.firebase
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

  const actualizarFotosUsuario = async (id, data) => {
    const dbRef = firebase.db.collection("usuarios").doc(id);
    await dbRef.set({
      ...profile,
      fotosSubidas: data,
    });
  };
  const guardarFoto = () => {
    setLoading(true);
    let fotosUser = profile.fotosSubidas;
    subirImgFB(url, "fotosBuenas", uuidv4()).then(async (data) => {
      console.log(`${new Date()}`);
      let fecha = new Date();
      let hoy = fecha.toDateString();
      await firebase.db.collection("postBuenos").add({
        idCreador: profile.id,
        likes: [],
        url: data.url,
        autorName: profile.nombre,
        fecha: hoy,
      });
      //guardar la foto en el array del usuario
      fotosUser.push({ url: data.url });
      setProfile({ ...profile, fotosSubidas: fotosUser });
      actualizarFotosUsuario(profile.id, fotosUser);
      setLoading(false);
      navigation.navigate("Photos");
      // REDIRIGIR A LA GALERIA
      alert("guardado");
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
