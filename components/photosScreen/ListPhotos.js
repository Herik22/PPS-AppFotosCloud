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

const ListPhotos = (props) => {
  const { photos } = props;
  const [cartFinal, setCartFinal] = useState("");
  const { photosGood, setPhotosGood } = useLogin();

  const ItemList = (props) => {
    const { info } = props;
    const { img, autor, fecha } = info.item;

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
          <Image style={styles.image} source={img} />
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
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>autor:</Text>
              <Text>{autor}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ fontWeight: "bold" }}> fecha:</Text>
              <Text>{fecha}</Text>
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
            <AntDesign
              name="like2"
              color={"green"}
              size={20}
              onPress={() => {}}
            />
            <AntDesign
              name="dislike2"
              color={"red"}
              size={20}
              onPress={() => {
                colorIcon = "green";
              }}
            />
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
