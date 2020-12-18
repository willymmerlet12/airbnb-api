import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, ActivityIndicator } from "react-native";
import axios from "axios";
import MapView from "react-native-maps";
import * as Location from "expo-location";
const AroundMe = ({ dataRoom }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const askPermissionAndGetLocation = async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        // console.log(location)
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setIsLoading(false);
      } else {
        alert("location permission denied");
      }
    };
    askPermissionAndGetLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
        );
        // console.log(response.data)
        setData(response.data);
      } catch (error) {
        alert(error.response.data.error);
      }
    };
    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  return isLoading && !data ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {data &&
        data.map((item) => {
          // console.log('dans le map', item)
          return (
            <MapView.Marker
              key={item._id}
              coordinate={{
                latitude: item.location[1],
                longitude: item.location[0],
              }}
              title={item.title}
              description={item.description}
              onPress={() => navigation.navigate("Rooms", { id: item._id })}
            />
          );
        })}
    </MapView>
  );
};
export default AroundMe;
