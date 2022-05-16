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
} from "react-native";
import React, { Component, useState, useRef, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";
import fondo from "../assets/fondos/fondo.png";
import ColorsPPS from "../utils/ColorsPPS";
import LoadingScreen from "../utils/loadingScreen";
import {
  Entypo,
  FontAwesome,
  Octicons,
  MaterialIcons,
} from "@expo/vector-icons";
import ListPhotos from "../components/photosScreen/ListPhotos";
import { Dataimg, Dataimg2 } from "../utils/Dataimg";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-easy-toast";
import { map } from "lodash";
import { Avatar } from "@rneui/base";
import {
  addDocumentWithoutId,
  getCurrentUser,
  updateProfile,
  uploadImage,
  db,
} from "../utils/actionsFirebase";
import { firebaseApp } from "../utils/firebase";
import uuidv4 from "random-uuid-v4";
import { Usuario } from "../components/entidades/usuarios";

export default Photos = (props) => {
  const toastRef = useRef();
  const { navigation } = props;
  const { photosGood, setPhotosGood, profile } = useLogin();
  const [loading, setLoading] = useState(false);
  const [imagesSelected, setImagesSelected] = useState([]);
  const [subiendoImagenes, setSubiendoImagenes] = useState(false);
  const [nameUpdatesImages, setNameUpdatesImages] = useState([]);

  useEffect(() => {
    const auxUser = new Usuario();
    console.log(profile);
  }, []);
  const ObtenerImagenesGaleria = async () => {
    // No permissions request is necessary for launching the image library
    let response = { status: false, url: null };
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      response.status = true;
      response.url = result.uri;
    }

    return response;
  };
  //obtiene las imagenes de la galeria del usuario y la agrega  aun array de img por subir
  const obtenerImgGalery = async () => {
    const response = await ObtenerImagenesGaleria();
    if (response.status) {
      setSubiendoImagenes(true);
      setImagesSelected([...imagesSelected, response.url]); // guardo en un array las imagenes seleccionadas.
      return;
    } else {
      return;
    }
  };

  //Sube cada  imagen  al fireStore
  const uploadImagesFireStore = async () => {
    const imagesUrl = [];
    const imagesNames = nameUpdatesImages;
    //permite ejecutar iteradamente funciones asyncronas
    await Promise.all(
      map(imagesSelected, async (image) => {
        //ITERO EL ARRAY CON LAS  IMAGENES A SUBIR Y LAS VOY SUBIENDO DE A UNA A LA COLECCION
        const nameImg = uuidv4();
        const response = await uploadImage(image, "fotosBuenas", nameImg);
        if (response.statusResponses) {
          //si se pudo subir la pusheo en el array de imagenes subidas.
          imagesNames.push(nameImg);
          imagesUrl.push(response.url);
        }
      })
    );

    setNameUpdatesImages(imagesNames);
    return imagesUrl;
  };

  const updateDocumetImage = async (arrayUrl) => {
    //Creo un documento de cada imagen subida.
    let rta = { status: false, error: null };
    try {
      const response = await addDocumentWithoutId("fotosBuenas", {
        createBy: "",
        name: "xxxxxxx",
        //url: arrayUrl[index],
        likesUser: "",
        cantLikes: 0,
        disLikesUser: "",
        cantDisLikes: 0,
        cantVotos: 0,
      });
      if (response.statusResponse) {
        rta.status = true;
      } else {
        rta.status = false;
        rta.error = response.error;
      }
    } catch (error) {
      rta.status = false;
      rta.error = error;
    }
    /*
    await Promise.all(
      map(nameUpdatesImages, async (nameImage, index) => {
        try {
          const docFoto = {
            createBy: profile.uid,
            name: nameImage,
            //url: arrayUrl[index],
            likesUser: [],
            cantLikes: 0,
            disLikesUser: [],
            cantDisLikes: 0,
            cantVotos: 0,
          };
          const responseAddDocument = await addDocumentWithoutId(
            "ImagenesBuenas",
            docFoto
          );
          if (!responseAddDocument.statusResponse) {
            rta = false;
            return rta;
          }
        } catch (error) {
          rta = false;
          return rta;
        }
      })
    );
    */
    return rta;
  };

  // ejecuta la subida de imagenes a la nube
  const subirImagenes = async () => {
    setLoading(true);
    if (imagesSelected.length > 0) {
      const responseUploadImagesFS = await uploadImagesFireStore();
      console.log("RTA AL GIUARDAR LAS IMAGES EN EL FIREBASE");
      console.log(responseUploadImagesFS);
      if (responseUploadImagesFS.length > 0) {
        setImagesSelected([]);
        setSubiendoImagenes(false);
      } else {
        setLoading(false);
        alert(
          "ha ocurrido un error creando los documentos de las imagenes o subiendo las mismas"
        );
      }
      setLoading(false);
    } else {
      setLoading(false);
      alert("NO HAY IMAGENES PARA SUBIR");
    }
  };

  const containerImgUpdate = () => {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          borderWidth: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 0.7,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollView horizontal>
            {map(imagesSelected, (imageSeleccionada, index) => (
              <Image
                source={{ uri: imageSeleccionada }}
                // source={imageSeleccionada}
                //key={index}
                style={{
                  width: 200,
                  height: 200,
                  borderWidth: 1,
                }}
              />
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: Dimensions.get("window").width * 0.7,
              height: Dimensions.get("window").height * 0.04,
              backgroundColor: ColorsPPS.amarillo,
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={async () => {
              subirImagenes();
            }}
          >
            <Text> subir </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: Dimensions.get("window").width * 0.7,
              height: Dimensions.get("window").height * 0.04,
              backgroundColor: ColorsPPS.amarillo,
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {}}
          >
            <Text> PRUEBA GUARDAR LOG </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const btnAction = (bgColor, titulo, colorTitulo, icon, action = () => {}) => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: "33%",
          backgroundColor: bgColor,
          borderRadius: 0,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          margin: 0,
          flexDirection: "row",
        }}
        onPress={action}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              color: colorTitulo,
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            {titulo}
          </Text>
          {icon}
        </View>
      </TouchableOpacity>
    );
  };

  return loading ? (
    <LoadingScreen message={"Cerrando Sesión"} />
  ) : (
    <View
      style={{
        backgroundColor: ColorsPPS.morado,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
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
        {subiendoImagenes ? (
          containerImgUpdate()
        ) : (
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <ListPhotos photos={photosGood ? Dataimg : Dataimg2} />
          </View>
        )}

        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {btnAction(
            ColorsPPS.amarillo,
            "Subir Foto",
            "black",
            <MaterialIcons
              name="add-a-photo"
              size={25}
              color={"black"}
              style={{ paddingHorizontal: 10 }}
            />,
            obtenerImgGalery
          )}
          {btnAction(
            ColorsPPS.morado,
            "Ver estadísticas",
            "white",
            <Octicons
              name="graph"
              size={25}
              color={"white"}
              style={{ paddingHorizontal: 10 }}
            />
          )}
          {btnAction(
            ColorsPPS.gris,
            "Ver mis Fotos",
            "black",
            <MaterialIcons
              name="photo-library"
              size={25}
              color={"black"}
              style={{ paddingHorizontal: 10 }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
