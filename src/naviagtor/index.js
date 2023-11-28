import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {TestingScreen, TestingScreenTwo} from '../screens';
import ContentPagesScreen from '../screens/ContentPagesScreen';
import {NavigationService} from '../utils';
// import DrawerNavigator from './drawer';
// import Reminders from '../screens/Reminders/index';
// import RemindersAddUpdate from '../screens/RemindersAddUpdate/index';
// import MapView from '../screens/MapView';
// import Locations from '../screens/Locations';
// import AddLocation from '../screens/AddLocation';
import SplashPopUp from '../screens/SplashPopUp';
import Login from '../screens/LoginScreen';
import PopUpStart from '../screens/PopUpStartScreen';

const Stack = createStackNavigator();
export const ScreeNames = {
  SplashPopUp: 'SplashPopUp',
  PopUpStart: 'PopUpStart',
  Login: 'Login',
  // Reminders: 'Reminders',
  // RemindersAddUpdate: 'RemindersAddUpdate',
  // MapScreen: 'MapScreen',
  // Locations: 'Locations',
  // AddLocation: 'AddLocation',
};
function StackScreens() {
  return (
    <Stack.Navigator initialRouteName="SplashPopUp">
      <Stack.Screen
        name="SplashPopUp"
        component={SplashPopUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PopUpStart"
        component={PopUpStart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
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

