import { Text, View, Animated, Image, Easing } from "react-native";
import React, { useEffect, useState } from "react";
import ColorsPPS from "../utils/ColorsPPS";
import { LinearGradient } from "expo-linear-gradient";
import Sizes_ from "../utils/Sizes";
import * as Font from "expo-font";

const NewSplash = (props) => {
  const { navigation } = props;
  const [fadeIn, setfadeIn] = useState(new Animated.Value(0));

  let rotateValueHolder = new Animated.Value(0);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const translateInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });
  const animateTranslation = {
    transform: [{ translateX: translateInterpolation }],
  };

  useEffect(() => {
    fadeIn_();
    startImageRotateFunction();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 4200);
  }, []);

  const fadeIn_ = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };
  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 4000,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  };

  const animation = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <LinearGradient
      colors={[ColorsPPS.amarillo, ColorsPPS.amarillo]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <View style={{ width: "70%", height: "40%", borderWidth: 0 }}>
        <Animated.Image
          source={require("../assets/logos/iconlogo.png")}
          style={[
            {
              width: "100%",
              height: "100%",
              resizeMode: "contain",
              transform: [{ rotate: rotateData }],
            },
            // animateTranslation,
          ]}
        />
      </View>

      <Animated.View
        style={{
          width: "100%",
          position: "absolute",
          bottom: "15%",
          justifyContent: "center",
          alignItems: "flex-start",
          opacity: fadeIn,
          borderWidth: 0,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: Sizes_.big + 2,
          }}
        >
          Herik Arismendy
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: Sizes_.big + 2,
          }}
        >
          División 4a
        </Text>
      </Animated.View>
    </LinearGradient>
  );
};

export default NewSplash;
