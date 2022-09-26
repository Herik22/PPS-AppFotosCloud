import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Input } from "@rneui/base";
import { Formik } from "formik";
import * as yup from "yup";
import { useLogin } from "../context/LoginProvider";
import ModalLogin from "../components/login/modalLogin";
import ColorsPPS from "../utils/ColorsPPS";
import LoadingScreen from "../utils/loadingScreen";
import { LinearGradient } from "expo-linear-gradient";
import Sizes_ from "../utils/Sizes";
import { authentication, db } from "../firebase-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const Login = (props) => {
  const { navigation } = props;
  const { setIsLogIn } = useLogin();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const colectionUsers = "users";
  const docName = "heriku";

  useEffect(() => {
    let users = [{ correo: "herik@gmail.com", clave: "" }];
    //getOneUser();
  }, []);

  const getCollectionUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => `);
      console.log(doc.data());
    });
  };
  const getOneUser = async () => {
    const docRef = doc(db, colectionUsers, docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const login = (values, actions = false) => {
    try {
      setLoading(true);
      authentication
        .signInWithEmailAndPassword(values.email, values.password)
        .then((_userCredentials) => {
          actions && actions.resetForm();
          setIsLogIn(true);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              Alert.alert("¡Ops!", "¡Usuario y/o Contraseña incorrectos!");
              break;
            case "auth/wrong-password":
              Alert.alert("¡Ops!", "¡Usuario y/o Contraseña incorrectos!");
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const btnLogin = (bgColor, color, txtName, action) => {
    return (
      <TouchableOpacity
        style={{
          height: "40%",
          width: "100%",
          alignSelf: "center",
          justifyContent: "center",
          margin: 10,
          borderRadius: 20,
          backgroundColor: bgColor,
          borderColor: ColorsPPS.blanco,
          borderWidth: 0.5,
        }}
        onPress={() => {
          action();
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: color,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {" "}
          {txtName}{" "}
        </Text>
      </TouchableOpacity>
    );
  };
  const btnInvited = (number, txtName) => {
    const onpressInvited = (numero) => {
      login({ email: `invitado${numero}@gmail.com`, password: "123456" });
    };

    return (
      <TouchableOpacity
        style={{
          height: "40%",
          width: "30%",
          backgroundColor: "transparent",
          alignSelf: "center",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          margin: 5,
          borderRadius: 10,
          borderColor: ColorsPPS.morado,
          borderWidth: 0.5,
          flexDirection: "row",
        }}
        onPress={() => {
          onpressInvited(number);
        }}
      >
        <FontAwesome5
          name={
            (number == 1 && "user-secret") ||
            (number == 2 && "user-tie") ||
            (number == 3 && "user-ninja")
          }
          size={15}
          color={ColorsPPS.morado}
        />
        <Text
          style={{
            textAlign: "center",
            color: ColorsPPS.morado,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {" "}
          {txtName}{" "}
        </Text>
      </TouchableOpacity>
    );
  };
  const LoginValidation = yup.object({
    email: yup
      .string()
      .required("Ingresa tu correo electrónico")
      .email("El formato el email es invalido"),

    password: yup.string().required("Ingresa tu contraseña"),
  });
  const formLogin = () => {
    return (
      <Formik
        initialValues={{ email: email, password: "" }}
        validationSchema={LoginValidation}
        onSubmit={(values, actions) => {
          // onPressLogIn(values);
          login(values, actions);
          //actions.resetForm();
        }}
      >
        {(formikprops) => (
          <View style={{ margin: 10 }}>
            <Input
              labelStyle={{ height: 0 }}
              errorStyle={{ height: 0 }}
              placeholder="Correo Electrónico"
              placeholderTextColor={ColorsPPS.blanco}
              style={{ width: "100%", padding: 5 }}
              inputContainerStyle={{
                borderColor: ColorsPPS.blanco,

                borderRadius: 10,
                borderWidth: 1,
                width: "100%",
              }}
              inputStyle={{ color: ColorsPPS.blanco }}
              leftIcon={
                <MaterialIcons
                  name="attach-email"
                  size={20}
                  color={ColorsPPS.morado}
                />
              }
              leftIconContainerStyle={{
                paddingLeft: 10,
              }}
              onChangeText={formikprops.handleChange("email")}
              onChange={(event) => setEmail(event.nativeEvent.text)}
              value={email}
              onBlur={formikprops.handleBlur("email")}
              defaultValue={email}
              name="email"
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {formikprops.touched.email && (
              <View style={[styles.errorTextContainer, { borderWidth: 0 }]}>
                <Text style={[styles.errorText]}>
                  {formikprops.touched.email && formikprops.errors.email}
                </Text>
              </View>
            )}
            <Input
              placeholder="Contraseña"
              placeholderTextColor={ColorsPPS.blanco}
              labelStyle={{ height: 0 }}
              errorStyle={{ height: 0 }}
              style={{ width: "100%", padding: 5 }}
              inputStyle={{ color: ColorsPPS.blanco }}
              inputContainerStyle={{
                borderColor: ColorsPPS.blanco,
                borderRadius: 10,
                borderWidth: 1,
                width: "100%",
              }}
              leftIcon={
                <MaterialCommunityIcons
                  name="shield-key"
                  size={20}
                  color={ColorsPPS.morado}
                />
              }
              leftIconContainerStyle={{
                paddingLeft: 10,
              }}
              onChangeText={formikprops.handleChange("password")}
              onChange={(event) => setPassword(event.nativeEvent.text)}
              value={password}
              onBlur={formikprops.handleBlur("password")}
              defaultValue={password}
              name="password"
              secureTextEntry={hidePassword}
              rightIcon={
                <Ionicons
                  name={hidePassword ? "eye" : "eye-off"}
                  size={20}
                  color={ColorsPPS.morado}
                  onPress={() => {
                    setHidePassword(!hidePassword);
                  }}
                />
              }
              rightIconContainerStyle={{ paddingRight: 10 }}
            />
            {formikprops.touched.password && (
              <View style={styles.errorTextContainer}>
                <Text style={[styles.errorText]}>
                  {formikprops.touched.password && formikprops.errors.password}
                </Text>
              </View>
            )}

            <View
              style={{
                height: Dimensions.get("window").height * 0.15,
                width: "100%",
                justifyContent: "center",
              }}
            >
              {btnLogin(
                ColorsPPS.morado,
                ColorsPPS.blanco,
                "Entrar",
                formikprops.handleSubmit
              )}
            </View>
          </View>
        )}
      </Formik>
    );
  };

  return loading ? (
    <LoadingScreen message={"Iniciando Sesión ... "} />
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: ColorsPPS.amarillo,
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LinearGradient
        colors={["#FFFFF", "#C51AEB", " #5E17EB"]}
        style={{
          width: Dimensions.get("window").width * 0.8,
          height: Dimensions.get("window").height * 0.3,
          flex: 0.4,
          marginTop: 20,
          margin: 6,
          borderRadius: 100,
          height: "100%",
          alignSelf: "center",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View
          style={{ width: "80%", height: "80%", flex: 1, alignSelf: "center" }}
        >
          <Image
            source={require("../assets/logos/iconlogo.png")}
            style={{ width: "100%", height: "100%", flex: 1 }}
          />
        </View>
      </LinearGradient>

      <View
        style={{
          marginVertical: 10,
          flex: 0.1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: ColorsPPS.blanco,
            fontSize: Sizes_.big,
            fontWeight: "bold",
          }}
        >
          App Relevamiento Visual
        </Text>
      </View>

      <View style={{ flex: 0.6, width: "100%", padding: 20 }}>
        {formLogin()}
      </View>

      <View
        style={{
          flex: 0.2,
          width: "100%",
          justifyContent: "space-around",
          flexDirection: "row",
          padding: 5,
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {btnInvited(1, "Invitado 1")}
        {btnInvited(2, "Invitado 2")}
        {btnInvited(3, "Invitado 3")}
      </View>
      {
        <ModalLogin
          showModal={showModal}
          setShowModal={setShowModal}
          message={"Ups,El usuario no se encuentra registrado."}
        />
      }
    </View>
  );
};
const styles = StyleSheet.create({
  errorText: {
    color: ColorsPPS.morado,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  errorTextContainer: {
    padding: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 0,
  },
});
export default Login;
