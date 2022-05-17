import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import { Entypo, AntDesign, Octicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/core";
import { useLogin } from "../../context/LoginProvider";
import firebase from "../../dataBase/firebase";
const ListPhotos = (props) => {
  const { photos } = props;
  const [cartFinal, setCartFinal] = useState("");
  const { photosGood, setPhotosGood, profile } = useLogin();

  const ItemList = (props) => {
    const { info } = props;
    const { url, autorName, fecha, id, likes } = info.item;
    let votada = false;
    console.log(info.item);

    likes.forEach((element) => {
      if (element == profile.id) {
        votada = true;
      }
    });

    const actualizarVotoFoto = async (id, data = "") => {
      const votosUsuarios = info.item.likes;
      let yaVoto = false;
      votosUsuarios.forEach((element) => {
        if (element == profile.id) {
          yaVoto = true;
        }
      });

      if (yaVoto) {
        alert("YA VOTO");
      } else {
        alert("NO HA VOTADO");
        votosUsuarios.push(profile.id);
        const dbRef = firebase.db.collection("postBuenos").doc(id);
        await dbRef.set({
          ...info.item,
          likes: votosUsuarios,
        });
      }

      /*∑ */
    };

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderBottomWidth: 0.5,
          border: "black",
          paddingBottom: 5,
          paddingTop: 5,
          borderWidth: 1,
          width: "100%",
        }}
      >
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
          <Image
            style={styles.image}
            source={{
              uri:
                url != false
                  ? url
                  : "https://yt3.ggpht.com/ytc/AKedOLSggvA4usmC3lIDdqORkmsje78sxwaSPsQ3gefNYw=s176-c-k-c0x00ffffff-no-rj",
            }}
          />
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flex: 0.7,
              justifyContent: "center",
              padding: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                borderWidth: 0,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 12, marginRight: 5 }}
              >
                Autor:
              </Text>
              <Text style={{ fontSize: 10 }}>{autorName}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                borderWidth: 0,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 12, marginRight: 5 }}
              >
                Fecha:
              </Text>
              <Text style={{ fontSize: 10 }}>{fecha}</Text>
            </View>
          </View>

          <View
            style={{
              flex: 0.25,
              justifyContent: "space-around",
              alignItems: "center",
              borderWidth: 0,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                actualizarVotoFoto(id);
              }}
            >
              <AntDesign
                name={votada ? "like1" : "like2"}
                color={votada ? "green" : "gray"}
                size={60}
                onPress={() => {}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <FlatList
        data={photos}
        renderItem={(photo) => <ItemList info={photo} />}
        keyExtractor={(item, index) => index.toString()}
        style={{ borderWidth: 1 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: Dimensions.get("window").height * 0.3,
  },
});

export default ListPhotos;
