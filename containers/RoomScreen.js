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

import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native";

import axios from "axios";

export default function RoomScreen({}) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <View>
            <Text>{item.title}</Text>
          </View>
        );
      }}
    />
  );
}
