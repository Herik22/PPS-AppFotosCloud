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
import { db } from "../firebase-config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/core";

export default Photos = (props) => {
  const cameraRef = useRef();

  const { navigation } = props;
  const { photosGood, setPhotosGood, profile } = useLogin();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const nameCollection = `post${photosGood ? "Buenos" : "Malos"}`;

  useFocusEffect(
    useCallback(() => {
      traerFotos();
    }, [])
  );

  useEffect(() => {}, []);

  const traerFotos = async () => {
    const fotosRef = collection(db, nameCollection);
    const q = query(fotosRef, orderBy("fecha", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    let auxArrayFotos = [];
    querySnapshot.forEach((doc) => {
      auxArrayFotos.push(doc.data());
    });

    setPosts(auxArrayFotos);
  };
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
    <LoadingScreen message={"Trayendo información ... "} />
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
              borderWidth: 0,
              justifyContent: "center",
            }}
          >
            <ListPhotos photos={posts} updateFotos={traerFotos} />
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
