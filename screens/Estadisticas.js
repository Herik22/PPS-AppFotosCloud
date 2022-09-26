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
  const data1 = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height * 0.3;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { photosGood, setPhotosGood, profile } = useLogin();
  const nameCollection = `post${photosGood ? "Buenos" : "Malos"}`;

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };
  useEffect(() => {
    //setLoading(true);

    const traerData = async () => {
      let auxPost = [];
      let auxLabels = [];
      let auxDataSets = [];

      const fotosRef = collection(db, nameCollection);
      const q = query(fotosRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { likes, id } = doc.data();
        const id_ = id.substring(0, 9);
        const votos_ = parseFloat(likes.length);
        if (photosGood) {
          let auxOBJ = {
            name: id_,
            votos: votos_,
            color: generateColor(),
            legendFontColor: "black",
            legendFontSize: 15, // id del DOCUMENTO
          };
          auxPost.push(auxOBJ);
        } else {
          auxLabels.push(id_);
          auxDataSets.push(votos_);
        }
      });

      const data1 = {
        labels: auxLabels,
        datasets: [
          {
            data: auxDataSets,
          },
        ],
      };
      photosGood ? setData(auxPost) : setData(data1);
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
            No hay suficientes datos 2{" "}
          </Text>
        </View>
      );
    }
  }
  const chartConfig = {
    //ORIGINAL
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const chartConfig2 = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    fillShadowGradientOpacity: 1,
    color: (opacity = 1) => `#023047`,
    labelColor: (opacity = 1) => `#333`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
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
        {photosGood && (
          <PieChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor={"votos"} //propiedad para los datos numericos.
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 5]}
            absolute
          />
        )}
        {!photosGood && (
          <BarChart
            //style={graphStyle}
            data={data}
            width={screenWidth}
            height={screenHeight}
            yAxisLabel=""
            chartConfig={chartConfig2}
            verticalLabelRotation={0}
          />
        )}
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
