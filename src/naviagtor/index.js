import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { TestingScreen, TestingScreenTwo } from "../screens";
import ContentPagesScreen from "../screens/ContentPagesScreen";
import { NavigationService } from "../utils";
import DrawerNavigator from "./drawer";

const Stack = createStackNavigator();

function StackScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContentPagesScreen"
        component={ContentPagesScreen}
        options={{ title: "ContentPagesScreen" }}
      />
      <Stack.Screen
        name="TestingScreen"
        component={TestingScreen}
        options={{ title: "TestingScreen" }}
      />
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TestingScreenTwo" component={TestingScreenTwo} />
    </Stack.Navigator>
  );
}

const AppContainer = () => {
  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <StackScreens />
    </NavigationContainer>
  );
};

export default AppContainer;
