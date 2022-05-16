import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Photos from "../screens/Photos";
import Register from "../screens/Register";
import Splash from "../screens/Splash";
import { useLogin } from "../context/LoginProvider";
import ColorsPPS from "../utils/ColorsPPS";
const Stack = createNativeStackNavigator();

const Init = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        component={Splash}
        options={{ headerShown: false }}
        name="Splash"
      />
      <Stack.Screen
        component={Login}
        options={{ headerShown: false }}
        name="Login"
      />
      <Stack.Screen
        component={Register}
        options={{ headerShown: false }}
        name="Registro"
      />
    </Stack.Navigator>
  );
};
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        options={{
          headerShown: false,
        }}
        name="Home"
      />
      <Stack.Screen
        component={Photos}
        options={{
          headerBackTitle: "Volver",
          title: "Fotos",
          headerStyle: {
            backgroundColor: ColorsPPS.morado,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="Photos"
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isFinishSplash, isLogIn } = useLogin();

  return isLogIn ? <MainStack /> : <Init />;
};

export default MainNavigator;
