import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import React, { Component, useState, useRef, useEffect } from "react";
import { Camera } from "expo-camera";
import ModalGuardarFoto from "../components/fotos/ModalGuardarFoto";
import LoadingScreen from "../utils/loadingScreen";
import { useLogin } from "../context/LoginProvider";
import ColorsPPS from "../utils/ColorsPPS";

export default CamaraPost = (props) => {
  const { navigation } = props;
  const { photosGood } = useLogin();
  const cameraRef = useRef();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    solicitarPermiso();
  }, []);

  const solicitarPermiso = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };
  // ********************************  CAMARA SETTINGG ********************************
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.1, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      //console.info(data);
      setUrl(data.uri);
      setModal(true);
    }
  };

  if (hasPermission === null) {
    return <View></View>;
  }
  if (hasPermission === false) {
    return (
      <View
        style={{
          justifyContent: "center",
          flex: 1,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No hay acceso a la camara</Text>
      </View>
    );
  }

  return loading ? (
    <LoadingScreen message={"Cargando foto"} />
  ) : (
    <View style={styles.container}>
      {
        <ModalGuardarFoto
          url={url}
          setModal={setModal}
          modal={modal}
          setLoading={setLoading}
          navigation={navigation}
        />
      }
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.on}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("cammera error", error);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              takePicture();
            }}
          ></TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.09,
    position: "absolute",
    bottom: 5,
    borderRadius: 60,
    backgroundColor: ColorsPPS.morado,
    justifyContent: "center",
    alignContent: "center",
    margin: 20,
  },
  button: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 18,
    color: "black",
  },
});
