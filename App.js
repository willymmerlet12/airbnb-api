import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [idUser, setIdUser] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  const setId = async (id) => {
    if (id) {
      await AsyncStorage.setItem("idUser", id);
      setIdUser(id);
    } else {
      await AsyncStorage.removeItem("idUser");
      setIdUser(null);
    }
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignInScreen setId={setId} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignUpScreen setId={setId} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in

        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen
            name="Home"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-home"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  options={{
                    headerTitle: (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("./assets/A.png")}
                      />
                    ),

                    headerTitleStyle: { color: "white" },
                  }}
                >
                  {(props) => <HomeScreen {...props} />}
                </Stack.Screen>

                <Stack.Screen
                  name="Rooms"
                  options={{
                    headerTitle: (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("./assets/A.png")}
                      />
                    ),

                    headerTitleStyle: { color: "white" },
                  }}
                >
                  {(props) => <RoomScreen {...props} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Map"
            options={{
              tabBarLabel: "Map",
              tabBarIcon: ({ color, size }) => (
                <Feather name={"map-pin"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Map"
                  options={{
                    headerTitle: (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("./assets/A.png")}
                      />
                    ),

                    headerTitleStyle: { color: "white" },
                  }}
                >
                  {() => <AroundMeScreen setToken={setToken} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Profile"
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name={"user"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Profile"
                  options={{
                    headerTitle: (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("./assets/A.png")}
                      />
                    ),
                  }}
                >
                  {(props) => (
                    <ProfileScreen
                      {...props}
                      setId={setId}
                      setToken={setToken}
                    />
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
