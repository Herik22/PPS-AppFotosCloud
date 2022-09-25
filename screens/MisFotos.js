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
  FlatList,
} from "react-native";
import React, {
  Component,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import firebase from "../dataBase/firebase";
import { useLogin } from "../context/LoginProvider";
import ColorsPPS from "../utils/ColorsPPS";
import { Fontisto } from "@expo/vector-icons";

export default MisFotos = () => {
  const { profile, photosGood } = useLogin();
  const [photos, setPhotos] = useState([]);
  const nameCollection = `post${photosGood ? "Buenos" : "Malos"}`;
  useEffect(() => {
    const getUserById = async (id) => {
      const dbRef = firebase.db.collection("usuarios").doc(id);
      const doc = await dbRef.get();

      const user = doc.data();
      console.log("user MIS FOTOS");
      console.log(user);
      setPhotos(photosGood ? user.fotosSubidasBuenas : user.fotosSubidasMalas);
    };

    // getUserById(profile.id);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: ColorsPPS.amarillo }}>
      <ScrollView>
        <FlatList
          horizontal
          data={photos}
          renderItem={(photo) => {
            console.log(photo);
            return (
              <View
                style={{
                  width: Dimensions.get("window").width * 0.95,
                  height: Dimensions.get("window").height * 0.8,
                }}
              >
                <Image
                  source={{
                    uri: photo.item.url
                      ? photo.item.url
                      : "https://i.ytimg.com/vi/Is3YYYGDaEE/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBRC2nJltkqPkczSU0c6WJvGqsE0w",
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <View
        style={{
          width: "100%",
          justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: 5,
          marginBottom: 40,
        }}
      >
        <Fontisto name="photograph" size={20} color={"black"} />
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          TUS IMAGENES {photosGood ? "Buenas" : "Malas"}
        </Text>
      </View>
    </View>
  );
};
