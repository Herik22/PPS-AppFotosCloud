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
import LoadingScreen from "../utils/loadingScreen";
import ColorsPPS from "../utils/ColorsPPS";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useLogin } from "../context/LoginProvider";
import { db } from "../firebase-config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
export default Estadisticas = () => {
  const data1 = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height * 0.3;

  const [data, setData] = useState(["", "", ""]);
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
    "#66FFFF",
    "#6633FF",
    "#CCFF66",
  ];
  useEffect(() => {
    //setLoading(true);

    const traerData = async () => {
      let auxPost = [];
      const fotosRef = collection(db, nameCollection);
      const q = query(fotosRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { idCreador, likes, autorName, url, fecha, id } = doc.data();
        const id_ = id.substring(0, 6);

        let auxOBJ = {
          name: id_,
          likes: likes,
          id: id,
          autorName: autorName,
          url: url,
          fecha: fecha,
          votos_: parseInt(likes.length),
          legendFontColor: "black",
          legendFontSize: 15, // id del DOCUMENTO
          color: colores[Math.round(Math.random() * (8 - 0) + 0)],
        };
        auxPost.push(doc.data());
        console.log(auxOBJ);
      });
      setData(auxPost);
      setLoading(false);
    };
    traerData();
  }, []);

  if (data.length < 1) {
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
          No hay suficientes datos 1{" "}
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
            No hay suficientes datos 2{" "}
          </Text>
        </View>
      );
    }
  }
  const chartConfig2 = {
    //ORIGINAL
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0,
    useShadowColorFromDataset: false, // optional
  };
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
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
        {false && (
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
        )}
        <PieChart
          data={data1}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[10, 50]}
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
