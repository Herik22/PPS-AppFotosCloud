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
  Alert,
} from "react-native";
import { Entypo, AntDesign, Octicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/core";
import { useLogin } from "../../context/LoginProvider";
import firebase from "../../dataBase/firebase";
import ColorsPPS from "../../utils/ColorsPPS";

const ListPhotos = (props) => {
  const { photos } = props;
  const { photosGood, setPhotosGood, profile } = useLogin();
  const nameCollection = `post${photosGood ? "Buenos" : "Malos"}`;

  useEffect(() => {}, []);

  const ItemList = (props) => {
    const { info } = props;
    const { url, autorName, fecha, id, likes, name } = info.item;
    const votos = likes.length;

    let votada = false;
    //console.log(info.item);

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
        return;
      } else {
        //NO HA VOTADO
        console.log("no ha votado");
        votosUsuarios.push(profile.id);
        const dbRef = firebase.db.collection(nameCollection).doc(id);
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
                marginBottom: 30,
                backgroundColor: ColorsPPS.amarillo,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginRight: 5,
                }}
              >
                ID:
              </Text>
              <Text style={{ fontSize: 20 }}> {name}</Text>
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
                style={{ fontWeight: "bold", fontSize: 14, marginRight: 5 }}
              >
                Fecha:
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{fecha}</Text>
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
              <Text style={{ textAlign: "center" }}> Votos: {votos} </Text>
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
