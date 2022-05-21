import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Dimensions,
  StatusBar,
  ImageBackground,
  StyleSheet,
} from "react-native";
import fondo from "../assets/fondos/fondocarga.png";
import { LinearGradient } from "expo-linear-gradient";
import ColorsPPS from "./ColorsPPS";
//import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const LoadingScreen = ({ message }) => {
  return (
    <LinearGradient
      style={styles.imagef}
      colors={[ColorsPPS.morado, ColorsPPS.amarillo]}
    >
      <View style={{ marginTop: 60 }}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <ActivityIndicator size="large" color={"white"} />
        <Text
          style={{
            color: "white",
            marginTop: height * 0.024,
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      </View>
    </LinearGradient>
  );
};
const Colors = {
  colorLetraGris: "#86939E",
  colorfondoCB: "transparent",
  violet: "#5D287E",
  azulPt: "#2E3880",
};
const styles = StyleSheet.create({
  imagef: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
export default LoadingScreen;
