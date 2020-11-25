import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        console.log(response.data);

        setIsLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <View style={[styles.cont, styles.hori]}>
      <ActivityIndicator size="large" color="red" />
    </View>
  ) : (
    <ScrollView>
      <View style={{ alignItems: "center", backgroundColor: "white" }}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View>
                <View>
                  <Image
                    style={styles.img}
                    source={{ uri: item.photos[0].url }}
                  ></Image>
                  <Text style={styles.price}>{item.price} € </Text>
                </View>
                <View style={{ justifyContent: "space-around" }}>
                  <Text
                    numberOfLines={1}
                    style={styles.title}
                    onPress={() => {
                      navigation.navigate("Rooms");
                    }}
                  >
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Entypo
                      name="star"
                      size={20}
                      style={styles.star}
                      color={item.ratingValue > 0 ? "#fbb30c" : "lightgrey"}
                    />
                    <Entypo
                      name="star"
                      size={20}
                      style={styles.star}
                      color={item.ratingValue > 1 ? "#fbb30c" : "lightgrey"}
                    />
                    <Entypo
                      name="star"
                      size={20}
                      style={styles.star}
                      color={item.ratingValue > 2 ? "#fbb30c" : "lightgrey"}
                    />
                    <Entypo
                      name="star"
                      size={20}
                      style={styles.star}
                      color={item.ratingValue > 3 ? "#fbb30c" : "lightgrey"}
                    />
                    <Entypo
                      name="star"
                      size={20}
                      style={styles.star}
                      color={item.ratingValue > 4 ? "#fbb30c" : "lightgrey"}
                    />
                    <Text style={styles.review}>{item.reviews} reviews</Text>
                  </View>
                  <Image
                    style={styles.avatar}
                    source={{ url: item.user.account.photo.url }}
                  />
                </View>
                <View style={styles.separator}></View>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  img: {
    height: 200,
    width: 380,

    marginTop: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
  },
  price: {
    color: "white",
    fontSize: 20,
    position: "absolute",
    top: "70%",
    backgroundColor: "black",
    padding: 10,
    paddingHorizontal: 15,
  },
  star: {
    marginRight: 5,
  },
  review: {
    color: "#bbbbbb",
  },
  avatar: {
    position: "absolute",
    right: "0%",
    top: "38%",
    height: 70,
    width: 70,
    borderRadius: 400 / 2,
  },
  separator: {
    marginTop: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  cont: {
    flex: 1,
    justifyContent: "center",
  },
  hori: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
