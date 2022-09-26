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
import { useLogin } from "../context/LoginProvider";
import ColorsPPS from "../utils/ColorsPPS";
import { Fontisto } from "@expo/vector-icons";
import updateCurrentUser from "../dataBase/newServicesFB";
export default MisFotos = () => {
  const { profile, photosGood, setProfile } = useLogin();
  const [photos, setPhotos] = useState([]);
  const nameCollection = `post${photosGood ? "Buenos" : "Malos"}`;

  useEffect(() => {
    updateCurrentUser(profile.uid, setProfile).then((val) => {
      setPhotos(photosGood ? profile.fotosLindas : profile.fotosMalas);
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: ColorsPPS.amarillo }}>
      <View style={{ flex: 0.8, borderWidth: 0 }}>
        <FlatList
          horizontal
          data={photos}
          renderItem={(photo) => {
            return (
              <View
                style={{
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height * 0.8,
                  borderWidth: 1,
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
      </View>
      <View
        style={{
          flex: 0.2,
          width: "100%",
          justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: 5,
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
