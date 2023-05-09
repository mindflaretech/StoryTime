/** @format */

import React from "react";
import { View, Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Images, Metrics } from "../../theme";
import { Util } from "../../utils";
import { styles } from "./styles";

const navigationItems = [
  {
    label: "Tab1",
    icon: Images.tab.homeIcon,
    component: HomeScreen,
    customIconStyles: {},
  },
  {
    label: "Tab2",
    icon: Images.tab.homeIcon,
    component: HomeScreen,
    customIconStyles: { height: 30, width: 30 },
  },
  {
    label: "Tab3",
    icon: Images.tab.homeIcon,
    component: HomeScreen,
    customIconStyles: {},
  },
  {
    label: "Tab4",
    icon: Images.tab.homeIcon,
    component: HomeScreen,
    customIconStyles: {},
  },
];

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Testing Screen</Text>
    </View>
  );
}
export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#BC2F27",
        tabBarStyle: {
          borderTopEndRadius: 25,
          borderTopStartRadius: 25,
          height: Util.isPlatformIOS()
            ? Metrics.screenHeight * 0.13
            : Metrics.ratio(90),
        },
      }}
    >
      {navigationItems.map(({ label, icon, component, customIconStyles }) => {
        return (
          <Tab.Screen
            name={label}
            component={component}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <>
                    <Image
                      source={icon}
                      resizeMode="contain"
                      style={[
                        styles.icon,
                        { tintColor: "#BC2F27" },
                        customIconStyles,
                      ]}
                    />
                  </>
                ) : (
                  <Image
                    source={icon}
                    resizeMode="contain"
                    style={[styles.icon, customIconStyles]}
                  />
                ),
              tabBarLabelStyle: { ...styles.labelFont },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
