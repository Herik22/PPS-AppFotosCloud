import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";
import ColorsPPS from "../utils/ColorsPPS";
import LoadingScreen from "../utils/loadingScreen";
import fondoGood from "../assets/home/fondoGood.png";
import fondoBad from "../assets/home/fondoBad.png";
import { Entypo, FontAwesome, Fontisto } from "@expo/vector-icons";

export default Home = (props) => {
  const { navigation } = props;
  const { setIsLogIn, setPhotosGood } = useLogin();
  const [loading, setLoading] = useState(false);
  const [msjLoading, setMsjLoading] = useState("Cerrando Sesión");
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setLogin(true);
  }, []);

  const btnHome = (bgColor, tittle, img, photosGood = true) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: bgColor,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          paddingTop: 10,
        }}
        onPress={() => {
          setPhotosGood(photosGood);
          navigation.navigate("Photos");
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 50 }}> {tittle} </Text>
          <Fontisto name="photograph" size={45} color="white" />
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
            borderRadius: 0,
            borderWidth: 0,
          }}
        >
          <ImageBackground
            source={img}
            style={{
              flex: 1,
            }}
            resizeMode="cover"
          ></ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  const closeSession = () => {
    setTimeout(() => {
      setLoading(false);
      setIsLogIn(false);
      //navigation.navigate("Login");
    }, 2000);
  };

  return loading ? (
    <LoadingScreen message={msjLoading} />
  ) : (
    <View
      style={{
        backgroundColor: ColorsPPS.morado,
        flex: 1,
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
        <Text style={{ textAlign: "center", paddingTop: 40 }}>
          {" "}
          {login ? "LOGEADO" : "NO LOGEADO"}
        </Text>
        <TouchableOpacity
          style={{
            width: Dimensions.get("window").width * 0.3,
            height: Dimensions.get("window").height * 0.04,
            backgroundColor: ColorsPPS.morado,
            borderRadius: 10,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
            margin: 10,
            paddingRight: 5,
            marginTop: Dimensions.get("window").height * 0.03,
            borderColor: ColorsPPS.amarillo,
            borderWidth: 1,
          }}
          onPress={() => {
            setMsjLoading("Cerrando Sesión.");
            setLoading(true);
            closeSession();
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
        {btnHome(ColorsPPS.amarillo, "Cosas Buenas", fondoGood)}
        {btnHome(ColorsPPS.gris, "Cosas Feas", fondoBad, false)}
      </View>
    </View>
  );
};
