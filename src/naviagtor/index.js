import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {TestingScreen, TestingScreenTwo} from '../screens';
import ContentPagesScreen from '../screens/ContentPagesScreen';
import {NavigationService} from '../utils';
import DrawerNavigator from './drawer';
import Reminders from '../screens/Reminders/index';
import RemindersAddUpdate from '../screens/RemindersAddUpdate/index';
import MapView from '../screens/MapView';
import Locations from '../screens/Locations';
import AddLocation from '../screens/AddLocation';

const Stack = createStackNavigator();
export const ScreeNames = {
  Reminders: 'Reminders',
  RemindersAddUpdate: 'RemindersAddUpdate',
  MapScreen: 'MapScreen',
  Locations: 'Locations',
  AddLocation: 'AddLocation',
  
};
function StackScreens() {
  return (
    <Stack.Navigator initialRouteName="Reminders">
      <Stack.Screen
        name="Reminders"
        component={Reminders}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RemindersAddUpdate"
        component={RemindersAddUpdate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Locations"
        component={Locations}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocation}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MapScreen"
        component={MapView}
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
