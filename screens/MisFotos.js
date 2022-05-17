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

export default MisFotos = () => {
  const { profile } = useLogin();
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const getUserById = async (id) => {
      const dbRef = firebase.db.collection("usuarios").doc(id);
      const doc = await dbRef.get();

      const user = doc.data();
      console.log("user");
      console.log(user);
      setPhotos(user.fotosSubidas);
      console.log(user.fotosSubidas[0].url);
    };
    getUserById(profile.id);
  }, []);

  return (
    <View>
      <ScrollView>
        <FlatList
          horizontal
          data={photos}
          renderItem={(photo) => {
            console.log(photo);
            return (
              <View
                style={{
                  width: Dimensions.get("window").width * 0.9,
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
          style={{ borderWidth: 1 }}
        />
      </ScrollView>
    </View>
  );
};
