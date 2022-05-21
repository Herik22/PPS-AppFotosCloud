import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import React, { Component, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";
import LottieView from "lottie-react-native";
import splash_ from "../assets/splash/animated2.json";
import splash_2 from "../assets/splash/animated3.json";
import { LinearGradient } from "expo-linear-gradient";
import ColorsPPS from "../utils/ColorsPPS";

export default Splash = (props) => {
  const { navigation } = props;
  const { setisFinishSplash, setIsLogIn } = useLogin();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 6500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#F7A500",
      }}
    >
      <Image
        source={require("../assets/splash/cloud.gif")}
        resizeMode={"center"}
        style={{
          width: "100%", //Dimensions.get("window").width * 0.8,
          height: Dimensions.get("window").height * 1,
        }}
      />
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").height * 0.3,
          marginBottom: 40,
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 40,
            padding: 5,
            color: "white",
          }}
        >
          Herik Arismendy División 4a
        </Text>
      </View>
    </View>
  );
  return (
    <View
      style={{
        backgroundColor: "#FFFF",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 0.9,
          //padding: 10,
          paddingRight: 10,
          alignSelf: "center",
        }}
      >
        <LottieView
          source={splash_}
          style={{ width: "90%", height: "90%", alignSelf: "center" }}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};
