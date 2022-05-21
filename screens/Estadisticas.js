import { Text, View, Dimensions } from "react-native";
import React, { Component, useEffect, useState } from "react";
import Plotly from "react-native-plotly";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import firebase from "../dataBase/firebase";
import LoadingScreen from "../utils/loadingScreen";
import ColorsPPS from "../utils/ColorsPPS";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useLogin } from "../context/LoginProvider";

export default Estadisticas = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height * 0.3;
  const layout = { title: "My cool chart!" };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { photosGood, setPhotosGood, profile } = useLogin();
  const nameCollection = `post${photosGood ? "Buenos" : "Malos"}`;
  const colores = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "pink",
    "orange",
    "violet",
    "gray",
  ];
  useEffect(() => {
    //setLoading(true);
    const TraerData = async () => {
      firebase.db.collection(nameCollection).onSnapshot((querySnapshot) => {
        const posts = [];
        querySnapshot.docs.forEach((doc) => {
          const { idCreador, likes, autorName, url, fecha, id } = doc.data(); // destructuro el doc

          const id_ = doc.id.substring(0, 6);
          posts.push({
            name: id_,
            likes: likes,
            id: doc.id,
            autorName: autorName,
            url: url,
            fecha: fecha,
            votos_: parseInt(likes.length),
            legendFontColor: "black",
            legendFontSize: 15, // id del DOCUMENTO
            color: colores[Math.round(Math.random() * (8 - 0) + 0)],
          });
        });
        //console.log(posts);
        setData(posts);
        setLoading(false);
      });
    };
    TraerData();
  }, []);

  if (!data.length > 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: ColorsPPS.amarillo,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {" "}
          No hay suficientes datos{" "}
        </Text>
      </View>
    );
  }
  if (data.length <= 1) {
    if (data[0].votos_ == 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: ColorsPPS.amarillo,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {" "}
            No hay suficientes datos{" "}
          </Text>
        </View>
      );
    }
  }
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0,
    useShadowColorFromDataset: false, // optional
  };
  return loading ? (
    <LoadingScreen message={"Cargando datos ..."} />
  ) : (
    <View
      style={{
        backgroundColor: ColorsPPS.amarillo,
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 0.2,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
          {" "}
          Estadísticas Cosas Buenas{" "}
        </Text>
      </View>
      <View>
        <PieChart
          data={data}
          width={screenWidth}
          height={screenHeight}
          chartConfig={chartConfig}
          accessor={"votos_"} //propiedad para los datos numericos.
          backgroundColor={ColorsPPS.amarillo}
          paddingLeft={"0"}
          center={[10, 5]}
          absolute
        />
      </View>

      <View
        style={{
          flex: 0.2,
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome name="pie-chart" size={60} color={"black"} />
      </View>
    </View>
  );
};
