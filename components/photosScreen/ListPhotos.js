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
import { db, app } from "../../firebase-config";

import { setDoc, doc } from "firebase/firestore";
import { Entypo, AntDesign, Octicons, MaterialIcons } from "@expo/vector-icons";
import { useLogin } from "../../context/LoginProvider";

import ColorsPPS from "../../utils/ColorsPPS";

const ListPhotos = (props) => {
  const { photos, updateFotos } = props;
  const { photosGood, setPhotosGood, profile } = useLogin();
  const nameCollection = `post${photosGood ? "Buenos" : "Malos"}`;

  useEffect(() => {}, []);

  const ItemList = (props) => {
    const { info } = props;
    const {
      url,
      autorName,
      fecha,
      id: idFotoo,
      likes,
      name,
      idCreador,
    } = info.item;
    const votos = likes.length;

    let votada = false;
    //console.log(info.item);

    likes.forEach((element) => {
      if (element == profile.uid) {
        votada = true;
      }
    });

    const actualizarVotoFoto = async (id) => {
      const votosUsuarios = info.item.likes;
      let yaVoto = false;
      votosUsuarios.forEach((element) => {
        if (element == profile.uid) {
          yaVoto = true;
        }
      });
      if (yaVoto) {
        console.log("Ya voto");
        return;
      } else {
        //NO HA VOTADO
        console.log("no ha votado");
        votosUsuarios.push(profile.uid);
        /* PRUEBAAA NEW FIREBASE */
        try {
          await setDoc(doc(db, nameCollection, id), {
            ...info.item,
            likes: votosUsuarios,
          });
          console.log("Likes Actualizados: ");
          updateFotos();
        } catch (e) {
          console.error("Error Actualizando Likes: ", e);
        }
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
          borderWidth: 0.3,
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
                padding: 5,
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
              <Text style={{ fontSize: 6 }}> {idCreador.substring(0, 20)}</Text>
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
                style={{ fontWeight: "bold", fontSize: 12, marginRight: 5 }}
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
                actualizarVotoFoto(idFotoo);
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
    <FlatList
      data={photos}
      renderItem={(photo) => <ItemList info={photo} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: Dimensions.get("window").height * 0.3,
  },
});

export default ListPhotos;
