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
} from "react-native";
import React, {
  Component,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useLogin } from "../context/LoginProvider";
import fondo from "../assets/fondos/fondo.png";
import ColorsPPS from "../utils/ColorsPPS";
import LoadingScreen from "../utils/loadingScreen";
import {
  Entypo,
  FontAwesome,
  Octicons,
  MaterialIcons,
} from "@expo/vector-icons";
import ListPhotos from "../components/photosScreen/ListPhotos";
import { Dataimg, Dataimg2 } from "../utils/Dataimg";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-easy-toast";
import { map } from "lodash";
import { Avatar } from "@rneui/base";
import { fileToBlob } from "../utils/helpers";
import firebase from "../dataBase/firebase";
import uuidv4 from "random-uuid-v4";
import { useFocusEffect } from "@react-navigation/core";

export default Photos = (props) => {
  const cameraRef = useRef();

  const { navigation } = props;
  const { photosGood, setPhotosGood, profile } = useLogin();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const TraerData = async () => {
        firebase.db.collection("postBuenos").onSnapshot((querySnapshot) => {
          const posts = [];
          querySnapshot.docs.forEach((doc) => {
            const { idCreador, likes, autorName, url, fecha } = doc.data(); // destructuro el doc
            posts.push({
              idCreador: idCreador,
              likes: likes,
              id: doc.id,
              autorName: autorName,
              url: url,
              fecha: fecha, // id del DOCUMENTO
            });
          });
          setPosts(posts);
          console.log("profiule");
          console.log(profile);
        });
      };
      TraerData();
    }, [])
  );

  useEffect(() => {}, []);

  const btnAction = (bgColor, titulo, colorTitulo, icon, action = () => {}) => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: "33%",
          backgroundColor: bgColor,
          borderRadius: 0,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          margin: 0,
          flexDirection: "row",
        }}
        onPress={action}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              color: colorTitulo,
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            {titulo}
          </Text>
          {icon}
        </View>
      </TouchableOpacity>
    );
  };

  return loading ? (
    <LoadingScreen message={"Cerrando Sesión"} />
  ) : (
    <View
      style={{
        backgroundColor: ColorsPPS.morado,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <ListPhotos photos={photosGood ? posts : Dataimg2} />
          </View>
        }

        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {btnAction(
            ColorsPPS.amarillo,
            "Subir Foto",
            "black",
            <MaterialIcons
              name="add-a-photo"
              size={25}
              color={"black"}
              style={{ paddingHorizontal: 10 }}
            />,
            () => {
              navigation.navigate("CamaraPost");
            }
            //obtenerImgGalery
          )}
          {btnAction(
            ColorsPPS.morado,
            "Ver estadísticas",
            "white",
            <Octicons
              name="graph"
              size={25}
              color={"white"}
              style={{ paddingHorizontal: 10 }}
            />,
            () => {
              navigation.navigate("Estadisticas");
            }
          )}
          {btnAction(
            ColorsPPS.gris,
            "Ver mis Fotos",
            "black",
            <MaterialIcons
              name="photo-library"
              size={25}
              color={"black"}
              style={{ paddingHorizontal: 10 }}
            />,
            () => {
              navigation.navigate("MisFotos");
            }
          )}
        </View>
      </View>
    </View>
  );
};
