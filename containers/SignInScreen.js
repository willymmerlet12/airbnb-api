import React, { useState } from "react";

import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  key,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      const userToken = "secret-token";
      setToken(userToken);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <Image
            style={styles.img}
            source={require("../assets/airbb.png")}
          ></Image>
          <Text style={styles.title}>Sign in</Text>
          <View style={{ marginBottom: 80, width: "80%" }}>
            <TextInput
              style={error !== "" ? styles.inputerr : styles.input}
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            <TextInput
              style={error !== "" ? styles.inputerr : styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
          <View>
            <View style={styles.margerr}>
              <Text style={styles.error}>{error}</Text>
            </View>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.button}> Sign in </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.account}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  img: {
    height: 120,
    width: 113,
    marginTop: 80,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "#b1B1b1",
    fontWeight: "700",
    marginBottom: 80,
    marginTop: 15,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 0.8,
    borderBottomColor: "#f9696e",
    marginBottom: 45,
    paddingBottom: 8,
  },
  inputerr: {
    fontSize: 18,
    borderBottomWidth: 0.8,
    borderBottomColor: "black",
    borderTopColor: "black",
    marginBottom: 45,
    paddingBottom: 8,
    borderColor: "black",
  },
  button: {
    color: "#818181",
    borderColor: "#f9696e",
    borderWidth: 3,
    borderRadius: 25,
    padding: 5,
    paddingHorizontal: 50,
    paddingVertical: 6,
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 15,
  },
  account: {
    fontSize: 15,
    color: "#818181",
    fontWeight: "600",
  },
  error: {
    color: "red",
  },
  margerr: {},
});
