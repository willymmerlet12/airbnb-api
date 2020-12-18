import React, { useState, useEffect } from "react";

import {
  ActivityIndicator,
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import MapView from "react-native-maps";

export default function RoomScreen({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClick, setisClick] = useState(false);
  const { params } = useRoute();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const id = params.id;

  const OnClick = () => {
    if (!isClick) {
      setisClick(true);
    } else {
      setisClick(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={[styles.cont, styles.hori]}>
      <ActivityIndicator size="large" color="red" />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.cont}>
        <SwiperFlatList
          data={data.photos}
          renderItem={({ item }) => {
            console.log(item);
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Image
              style={styles.img}
              source={{
                uri: data.photos[0].url,
              }}
            />

            <View style={styles.infos}>
              <View style={styles.infosView}>
                <Text style={styles.title} numberOfLines={1}>
                  {data.title}
                </Text>

                <View style={styles.ratingView}>
                  <View style={{ flexDirection: "row" }}>
                    <Entypo
                      name="star"
                      size={20}
                      style={styles.star}
                      color={data.ratingValue > 0 ? "#fbb30c" : "lightgrey"}
                    />
                    <Entypo
                      name="star"
                      size={20}
                      style={styles.star}
                      color={data.ratingValue > 1 ? "#fbb30c" : "lightgrey"}
                    />
                    <Entypo
                      name="star"
                      size={20}
                      style={styles.star}
                      color={data.ratingValue > 2 ? "#fbb30c" : "lightgrey"}
                    />
                    <Entypo
                      name="star"
                      size={20}
                      style={styles.star}
                      color={data.ratingValue > 3 ? "#fbb30c" : "lightgrey"}
                    />
                    <Entypo
                      name="star"
                      size={20}
                      style={styles.star}
                      color={data.ratingValue > 4 ? "#fbb30c" : "lightgrey"}
                    />
                  </View>
                  <Text style={styles.review}> {data.reviews} reviews</Text>
                </View>
              </View>

              <Image
                source={{
                  uri: data.user.account.photo.url,
                }}
                style={styles.userPic}
              />
            </View>
          </View>
        </SwiperFlatList>
        <Text style={styles.price}>{data.price} €</Text>
        <View style={styles.desc}>
          {isClick === true ? (
            <>
              <Text numberOfLines={7}>{data.description}</Text>
              <TouchableOpacity onPress={OnClick}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginTop: 5 }}>show less</Text>
                  <AntDesign
                    style={{ marginTop: 7 }}
                    name="caretup"
                    size={15}
                  />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text numberOfLines={3}>{data.description}</Text>
              <TouchableOpacity onPress={OnClick}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginTop: 5 }}>Show more</Text>
                  <AntDesign
                    style={{ marginTop: 6 }}
                    name="caretdown"
                    size={15}
                  />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: "center",
  },
  hori: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  price: {
    color: "white",
    fontSize: 20,
    position: "absolute",
    top: "40%",
    backgroundColor: "black",
    padding: 10,
    paddingHorizontal: 20,
  },
  img: {
    height: 300,
    width: 420,
  },
  infos: {
    height: 100,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userPic: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  infosView: {
    width: "70%",
  },
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 5,
  },
  star: {
    marginRight: 5,
  },
  review: {
    color: "#bbbbbb",
  },
  desc: {
    marginRight: 10,
    marginLeft: 15,
    paddingTop: 10,
  },
  cont: {
    width: "100%",
  },
  map: {
    marginTop: 10,
    width: 420,
    height: 270,
  },
});
