import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity } from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

export default function ProfileScreen({ setToken, setId }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pic, setPic] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const idUser = await AsyncStorage.getItem("idUser");
        console.log(idUser);

        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${idUser}`,
          {
            headers: {
              authorization: "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        setEmail(data.email);
        setIsLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    fetchData();
  }, []);

  const userPic = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const resu = await ImagePicker.launchCameraAsync();

      if (resu.cancelled === false) {
        setPic(resu.uri);
      } else {
        alert("No pic selected");
      }
    } else {
      alert("declined");
    }
  };

  const userCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const resu = await ImagePicker.launchCameraAsync();

      if (!resu.cancelled) {
        setPic(resu.uri);
      }
    }
  };
  const picUpdate = async () => {
    try {
      const uriParts = pic.split(".");
      const fileType = uriParts[1];
      const formData = new FormData();
      formData.append("photo", {
        uri: uri,
        type: `image/${fileType}`,
        name: `photo/${fileType}`,
      });
      const token = await AsyncStorage.getItem("userToken");
      setIsLoading(true);
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  const updateInfos = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("description", description);
      formData.append("username", name);
      const token = await AsyncStorage.getItem("userToken");
      setIsLoading(true);
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("update infos", response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.error);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <View style={[styles.hori, styles.cont]}>
      <ActivityIndicator size="large" color="red" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.profile}>
            {data.photo ? (
              <Image source={{ uri: data.photo[0].url }} />
            ) : (
              <AntDesign name="user" size={125} />
            )}
          </TouchableOpacity>

          <Ionicons
            name="ios-images"
            size={35}
            color="grey"
            style={styles.imageIcon}
            onPress={userPic}
          />
          <AntDesign
            name="camera"
            size={35}
            color="grey"
            style={styles.cameraIcon}
            onPress={userCamera}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(username) => setUsername(username)}
            value={username}
          />
          <TextInput
            multiline={true}
            numberOfLines={8}
            maxLength={200}
            style={styles.areaText}
            placeholder="Description"
            onChangeText={(description) => setDescription(description)}
            value={description}
          />
          <TouchableOpacity
            style={styles.buttonU}
            onPress={(picUpdate, updateInfos)}
          >
            <Text style={styles.textButton}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOut}
            onPress={() => {
              setToken(null);
              setId(null);
            }}
          >
            <Text style={styles.textButton}>Log out</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 15,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    height: 45,
    width: 260,
    marginVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F35960",
  },
  areaText: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#F35960",
    width: 250,
    height: 80,
    paddingHorizontal: 15,
    paddingTop: 10,
    textAlignVertical: "top",
    marginBottom: 20,
    marginHorizontal: "10%",
    borderRadius: 5,
  },
  buttonU: {
    backgroundColor: "#F35960",
    borderRadius: 50,
    padding: 20,
    paddingHorizontal: 70,
    marginTop: 20,
  },
  textButton: {
    color: "white",
    fontSize: 18,
  },
  buttonOut: {
    backgroundColor: "black",
    borderRadius: 50,
    padding: 20,
    paddingHorizontal: 70,
    marginTop: 20,
  },
  cameraIcon: {
    position: "absolute",
    right: "20%",
    top: "4%",
  },
  imageIcon: {
    position: "absolute",
    top: "12%",
    right: "20%",
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#F35960",
    marginRight: 20,
  },
});
